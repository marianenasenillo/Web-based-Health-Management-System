<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showRecords = ref(false)

// list of record types (you can add more)
const recordItems = ref([
  { id: 'household', label: 'Household Profiling' },
  { id: 'household_head', label: 'Household Head Profiling' }
])

// which menu is open (index), null = none
const openMenuIndex = ref(null)

const goPrevPage = () => router.push('/previous')
const goNextPage = () => router.push('/next')
const toggleRecords = () => (showRecords.value = !showRecords.value)

function toggleMenu(index, e) {
  // stop event so global listener won't immediately close it
  if (e) e.stopPropagation()
  openMenuIndex.value = openMenuIndex.value === index ? null : index
}

function closeMenus() {
  openMenuIndex.value = null
}

// actions
function fillIn(item) {
  // example: navigate to a fill form route
  // router.push(`/fill/${item.id}`)
  console.log('Fill in', item)
  closeMenus()
  // optionally close overlay as well:
  // showRecords.value = false
}

function viewRecord(item) {
  // example: navigate to view records page
  // router.push(`/records/${item.id}`)
  console.log('View record', item)
  closeMenus()
}

function onWindowClick(e) {
  // if clicked outside any menu wrapper, close menus
  if (!e.target.closest('.menu-btn-wrapper')) {
    closeMenus()
  }
}

onMounted(() => {
  window.addEventListener('click', onWindowClick)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', onWindowClick)
})
</script>

<template>
  <DashboardView>
    <div class="hps-bg d-flex align-items-center justify-content-between position-relative">
      <!-- Previous Arrow -->
      <button class="arrow-btn prev-btn" @click="goPrevPage">❮</button>

      <!-- Overlay Content -->
      <div class="overlay-content text-white text-start ms-5">
        <!-- Search bar -->
        <div class="input-group mb-3 search-box">
          <input type="text" class="form-control" placeholder="Search..." />
          <button class="btn btn-light">Go</button>
        </div>

        <h1 class="fw-bold">Household Profiling Services</h1>
        <p>Click to view and manage household records efficiently.</p>

        <!-- View Records Button -->
        <button class="btn view-btn mt-3" @click="toggleRecords">View Records</button>
      </div>

      <!-- Next Arrow -->
      <button class="arrow-btn next-btn" @click="goNextPage">❯</button>
    </div>

    <!-- Records Overlay -->
    <div v-if="showRecords" class="records-overlay">
      <div class="records-box d-flex align-items-center">
        <!-- Back button -->
        <button class="back-btn" @click="toggleRecords">← back</button>

        <img src="/images/hpslogo.png" alt="Household Logo" class="hps-logo" />

        <!-- Text + items with three-dot menus -->
        <div class="records-content">
          <p>
            <em>"Household Profiling"</em> in the Barangay Health Station aims to gather and
            organize essential information about families in the community to support health
            planning, monitoring, and delivery of services.
          </p>

          <!-- inside records-content -->
<div class="record-list">
  <div
    v-for="(item, idx) in recordItems"
    :key="item.id"
    class="record-row d-flex align-items-center justify-content-between"
  >
    <div class="record-label">
      {{ item.label }}
    </div>

    <div class="menu-btn-wrapper">
      <button
        class="dots-btn"
        @click.stop="toggleMenu(idx, $event)"
        :aria-expanded="openMenuIndex === idx ? 'true' : 'false'"
        aria-haspopup="true"
      >
        ⋮
      </button>

      <div
        v-if="openMenuIndex === idx"
        class="menu"
        role="menu"
      >
        <button class="menu-item" @click="fillIn(item)">Fill in</button>
        <button class="menu-item" @click="viewRecord(item)">View record</button>
      </div>
    </div>
  </div>
</div>

        </div>

      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
/* kept your earlier layout styles (trimmed to relevant parts) */
.hps-bg {
  background: url('/images/householdprofiling.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 4rem;
}

.overlay-content {
  background: rgba(91, 132, 30, 0.85);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 480px;
  margin-left: 6rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.view-btn {
  background-color: #ffcc00;
  color: #000;
  font-weight: 600;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: 0.3s;
  width: 100%;
}
.view-btn:hover { background-color: #e6b800; }

.arrow-btn {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.arrow-btn:hover { background: rgba(0, 0, 0, 0.8); }
.prev-btn { position: absolute; left: 20px; }
.next-btn { position: absolute; right: 20px; }

/* Records overlay */
.records-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
}

/* Records box (single clean definition) */
.records-box {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  padding: 3rem 4rem;
  border-radius: 1rem;
  max-width: 1400px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 4rem;
}


/* Back button */
.back-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  font-weight: bold;
  color: #000;
  font-size: 1.25rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.back-btn:hover { transform: scale(1.1); }

/* Logo */
.hps-logo { width: 500px; flex-shrink: 0; }

/* Content */
.records-content { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.records-content p { font-size: 1.15rem; line-height: 1.7; margin-bottom: 2rem; }

/* record rows */
.record-list { width: 100%; }
.record-row { padding: 0.6rem 0; border-radius: 6px; }
.record-label { font-weight: 600; color: #222; }

/* three-dot button */
.menu-btn-wrapper { position: relative; display: inline-block; }
.dots-btn {
  background: transparent;
  border: none;
  font-size: 1.6rem;
  color: #5b841e;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dots-btn:hover { transform: scale(1.05); }

/* menu */
.menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  min-width: 160px;
  overflow: hidden;
  z-index: 3000;
}
.menu-item {
  display: block;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 0.98rem;
}
.menu-item:hover { background: #f4f4f4; }

/* small responsiveness */
@media (max-width: 900px) {
  .hps-bg { padding: 0 2rem; }
  .overlay-content { margin-left: 1.5rem; max-width: 360px; }
  .hps-logo { width: 260px; }
  .records-box { gap: 1.2rem; padding: 2rem; max-width: 980px; }
}
</style>
