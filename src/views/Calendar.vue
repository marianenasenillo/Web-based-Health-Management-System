<script setup>
import DashboardView from '@/components/DashboardView.vue';
import { DayPilot, DayPilotMonth } from '@daypilot/daypilot-lite-vue'
import { ref, onMounted, computed } from 'vue'

const monthRef = ref(null)
const startDate = ref("2026-10-01")
const events = ref([])

const colors = {
  event: "#3c78d8",
  task: "#6aa84f",
  reminder: "#f1c232",
  holiday: "#cc0000",
}

const onEventMoved = (args) => console.log("Event moved: " + args.e.text())
const onEventResized = (args) => console.log("Event resized: " + args.e.text())

const onTimeRangeSelected = async (args) => {
  const form = [
    { name: "Title", id: "text", value: "New Event" },
    { name: "Description", id: "description", value: "" }
  ]
  const modal = await DayPilot.Modal.form(form)
  const dp = args.control
  dp.clearSelection()
  if (modal.canceled) return
  dp.events.add({
    start: args.start,
    end: args.end,
    id: DayPilot.guid(),
    text: modal.result.text,
    description: modal.result.description,
    type: "event",
  })
}

const onEventClicked = async (args) => {
  const form = [
    { name: "Title", id: "text" },
    { name: "Description", id: "description" }
  ]
  const modal = await DayPilot.Modal.form(form, args.e.data)
  if (modal.canceled) return
  monthRef.value.control.events.update(modal.result)
}

const onBeforeEventRender = (args) => {
  const color = colors[args.data.type] || "#3c78d8"
  args.data.backColor = color + "55"
  args.data.borderColor = color + "44"
  args.data.barColor = color + "66"

  args.data.areas = [
    {
      right: 4,
      top: 3,
      width: 24,
      height: 24,
      padding: 2,
      fontColor: "#ffffff",
      backColor: color + "55",
      symbol: "icons/daypilot.svg#threedots-v",
      action: "ContextMenu",
      style: "border-radius: 50%",
    },
  ]

  if (args.data.locked) {
    args.data.text += " (locked)"
    args.data.areas.push({
      right: 30,
      top: 3,
      width: 24,
      height: 24,
      padding: 4,
      fontColor: "#ffffff",
      backColor: color + "55",
      symbol: "icons/daypilot.svg#padlock",
      style: "border-radius: 50%",
      onClick: async (a) => {
        const modal = await DayPilot.Modal.confirm("Do you really want to unlock this event?")
        if (modal.canceled) return
        toggleEventLock(a.source)
      },
    })

    args.data.moveDisabled = true
    args.data.resizeDisabled = true
    args.data.clickDisabled = true
    args.data.deleteDisabled = true
  }
}

// --- CONTEXT MENU ---
const contextMenu = new DayPilot.Menu({
  items: [
    { text: "Edit...", onClick: (args) => editEvent(args.source) },
    { text: "Delete", symbol: "icons/daypilot.svg#x-4", onClick: (args) => deleteEvent(args.source) },
    { text: "Lock", symbol: "icons/daypilot.svg#padlock", onClick: (args) => toggleEventLock(args.source) },
    { text: "-" },
    { text: "Duplicate", onClick: (args) => duplicateEvent(args.source) },
    { text: "Postpone", symbol: "icons/daypilot.svg#minichevron-right-4", onClick: (args) => postponeEvent(args.source) },
    { text: "-" },
    {
      text: "Type",
      items: [
        { text: "Event", icon: "icon icon-blue", onClick: (args) => updateEventType(args.source, "event") },
        { text: "Task", icon: "icon icon-green", onClick: (args) => updateEventType(args.source, "task") },
        { text: "Reminder", icon: "icon icon-yellow", onClick: (args) => updateEventType(args.source, "reminder") },
        { text: "Holiday", icon: "icon icon-red", onClick: (args) => updateEventType(args.source, "holiday") },
      ],
    },
  ]
})

// --- HELPERS ---
const editEvent = async (e) => {
  const form = [
    { name: "Title", id: "text" },
    { name: "Description", id: "description" }
  ]
  const modal = await DayPilot.Modal.form(form, e.data)
  if (modal.canceled) return
  monthRef.value.control.events.update(modal.result)
}

const deleteEvent = async (e) => {
  const modal = await DayPilot.Modal.confirm("Do you really want to delete this event?")
  if (modal.canceled) return
  monthRef.value.control.events.remove(e)
}

const duplicateEvent = (e) => {
  const newEvent = { ...e.data, id: DayPilot.guid() }
  monthRef.value.control.events.add(newEvent)
}

const postponeEvent = (e) => {
  e.data.start = e.start().addDays(1)
  e.data.end = e.end().addDays(1)
  monthRef.value.control.events.update(e)
}

const updateEventType = (e, type) => {
  e.data.type = type
  monthRef.value.control.events.update(e)
}

const toggleEventLock = (e) => {
  e.data.locked = !e.data.locked
  monthRef.value.control.events.update(e)
}

const loadEvents = () => {
  events.value = [
    { id: 1, start: "2026-10-06T00:00:00", end: "2026-10-07T00:00:00", text: "Event 1", description: "Description for Event 1", type: "event" },
    { id: 2, start: "2026-10-07T00:00:00", end: "2026-10-08T00:00:00", text: "Reminder", description: "Description for Reminder", type: "reminder" },
    { id: 3, start: "2026-10-07T00:00:00", end: "2026-10-08T00:00:00", text: "Task 1", description: "Description for Task 1", type: "task" },
    { id: 4, start: "2026-10-13T00:00:00", end: "2026-10-14T00:00:00", text: "Holiday", description: "Locked event", type: "holiday", locked: true },
  ]
}

const eventList = computed(() => events.value)

onMounted(() => loadEvents())
</script>

<template>
  <DashboardView>
    <div class="calendar-bg">
      <div class="calendar-box">
        <DayPilotMonth
          ref="monthRef"
          :startDate="startDate"
          :eventHeight="37"   
          :cellHeight="70"    
          :events="events"
          :contextMenu="contextMenu"
          @eventMoved="onEventMoved"
          @eventResized="onEventResized"
          @eventClicked="onEventClicked"
          @timeRangeSelected="onTimeRangeSelected"
          @beforeEventRender="onBeforeEventRender"
        />
      </div>

      <!-- Event list sidebar -->
      <div class="event-list-container" ref="scrollContainer">
        <h3>Events</h3>
        <div class="event-list-scroll">
          <div v-for="event in eventList" :key="event.id" class="event-item" :style="{ borderLeft: '6px solid ' + (colors[event.type] || '#3c78d8') }">
            <strong :style="{ color: colors[event.type] || '#3c78d8' }">{{ event.text }}</strong><br/>
            <span>{{ event.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </DashboardView>
</template>

<style>
.calendar-bg {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: url('/images/health.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
  align-items: flex-start;
  backdrop-filter: blur(2px);
}

.calendar-box {
  width: 1000px;
  height: 450px; /* fixed height */
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  box-shadow: 0 12px 32px rgba(30,41,59,0.13), 0 1.5px 6px rgba(30,41,59,0.10);
  border: 1px solid #e2e8f0;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  overflow: auto; /* scrolls if content exceeds */
  display: flex;
  flex-direction: column;
}

.event-list-container {
  width: 400px;
  height: 450px; /* fixed height */
  padding: 20px;
  border-radius: 12px;
   background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  box-shadow: 0 12px 32px rgba(30,41,59,0.10), 0 1.5px 6px rgba(30,41,59,0.08);
  border: 1px solid #e2e8f0;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* prevents stretching */
}

.event-list-container h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 1.2rem;
  letter-spacing: 0.5px;
}

.event-list-scroll {
  flex: 1;
  overflow-y: auto; /* makes event list scrollable */
}

.event-item {
  margin-bottom: 1rem;
  padding: 12px 10px;
  border-radius: 12px;
  border-bottom: none;
  background: #f1f5f9;
  box-shadow: 0 2px 8px rgba(30,41,59,0.04);
  transition: box-shadow 0.2s, background 0.2s;
}

.event-item:hover {
  background: #e0e7ef;
  box-shadow: 0 4px 16px rgba(30,41,59,0.08);
}

.event-item strong {
  font-size: 1.08rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.event-item span {
  color: #64748b;
  font-size: 0.98rem;
}

.month_default_event_inner {
  border-radius: 18px;
  padding-left: 25px;
  font-size: 1rem;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  background: #f1f5f9;
  box-shadow: 0 2px 8px rgba(30,41,59,0.07);
}

.month_default_event_bar_inner {
  width: 20px;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(30,41,59,0.10);
}

/* Optional: subtle hover effect for calendar events */
.month_default_event:hover .month_default_event_inner {
  background: #e0e7ef;
  box-shadow: 0 4px 16px rgba(30,41,59,0.10);
}
</style>
