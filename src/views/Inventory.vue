<script setup>
import { ref, computed } from 'vue'
import DashboardView from '@/components/DashboardView.vue'

// Tools list
const tools = ref([
  { name: 'Sphygmomanometer', quantity: 5 },
  { name: 'Height Measuring Tape', quantity: 3 },
])
const newTool = ref({ name: '', quantity: 1 })

// Modal state for availing tool
const showAvailModal = ref(false)
const availForm = ref({ name: '', purok: '', quantity: 1 })
const selectedTool = ref(null)

// Computed: only show tools with quantity > 0
const availableTools = computed(() =>
  tools.value.filter(tool => tool.quantity > 0)
)

// Avail a tool (open modal)
const availTool = (tool) => {
  selectedTool.value = tool
  availForm.value = { name: '', purok: '', quantity: 1 }
  showAvailModal.value = true
}

// Confirm avail (decrement stock)
const confirmAvail = () => {
  if (
    availForm.value.name &&
    availForm.value.purok &&
    availForm.value.quantity > 0 &&
    selectedTool.value.quantity >= availForm.value.quantity
  ) {
    selectedTool.value.quantity -= availForm.value.quantity
    showAvailModal.value = false
  }
}

// Add new tool
const addTool = () => {
  if (newTool.value.name && newTool.value.quantity > 0) {
    tools.value.push({ ...newTool.value })
    newTool.value = { name: '', quantity: 1 }
  }
}

// Add tool modal
const showAddToolModal = ref(false)
const addToolForm = ref({ name: '', quantity: 1 })

const openAddToolModal = () => {
  addToolForm.value = { name: '', quantity: 1 }
  showAddToolModal.value = true
}

const confirmAddTool = () => {
  if (addToolForm.value.name && addToolForm.value.quantity > 0) {
    tools.value.push({ ...addToolForm.value })
    showAddToolModal.value = false
  }
}
</script>

<template>
  <DashboardView>
    <div class="inventory-bg">
      <div class="inventory-card">
        <h2>Medicine Stocks</h2>
        <div class="scrollable-content">
          <div v-for="tool in availableTools" :key="tool.name" class="medicine-stock-item">
            <span>{{ tool.name }}</span>
            <span class="stock-count">{{ tool.quantity }}</span>
            <button class="avail-btn" @click="availTool(tool)">Avail</button>
          </div>
        </div>
      </div>

      <div class="inventory-card">
        <h2>Tools Available</h2>
        <div class="scrollable-content">
          <div class="tools-list">
            <div 
              v-for="tool in availableTools" 
              :key="tool.name" 
              class="tool-item"
            >
              {{ tool.name }} ({{ tool.quantity }})
            </div>
          </div>
        </div>
        <div class="tools-input">
          <button class="add-tool-btn" @click="openAddToolModal">Add Tool</button>
        </div>
        
      </div>

      <!-- Avail Modal -->
      <div v-if="showAvailModal" class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" @click="showAvailModal = false" v-if="showAvailModal">&times;</button>
          <h3>Avail Tool: {{ selectedTool?.name }}</h3>
          <label>
            Name:
            <input v-model="availForm.name" placeholder="Your Name" />
          </label>
          <label>
            Purok:
            <input v-model="availForm.purok" placeholder="Purok" />
          </label>
          <label>
            Quantity:
            <input v-model.number="availForm.quantity" type="number" min="1" :max="selectedTool?.quantity" />
          </label>
          <div class="modal-actions">
            <button @click="confirmAvail">Confirm</button>
            <button @click="showAvailModal = false">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Add Tool Modal -->
      <div v-if="showAddToolModal" class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" @click="showAddToolModal = false" v-if="showAddToolModal">&times;</button>
          <h3>Add Tool</h3>
          <label>
            Tool Name:
            <input v-model="addToolForm.name" placeholder="Tool Name" />
          </label>
          <label>
            Quantity:
            <input v-model.number="addToolForm.quantity" type="number" min="1" placeholder="Quantity" />
          </label>
          <div class="modal-actions">
            <button @click="confirmAddTool">Confirm</button>
            <button @click="showAddToolModal = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.inventory-bg {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: url('/images/inventory.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
}

.inventory-card {
  flex: 1 1 400px;
  min-width: 710px;
  max-width: 400px;
  height: 450px; /* fixed height */
  background-color: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  position: relative;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.medicine-stock-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.stock-count {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 1rem;
  text-align: center;
}

.avail-btn {
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #6aa84f;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.tools-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tool-item {
  padding: 8px 12px;
  background-color: #f1f1f1;
  border-radius: 6px;
  user-select: none;
  transition: background 0.2s;
}

.tools-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
}

.add-tool-btn {
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #6aa84f;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30, 41, 59, 0.45); /* darken overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  padding: 2.5rem 2rem;
  border-radius: 18px;
  min-width: 320px;
  max-width: 95vw;
  width: 100%;
  box-shadow: 0 12px 32px rgba(30,41,59,0.18), 0 1.5px 6px rgba(30,41,59,0.10);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  position: relative;
  animation: modalPop 0.3s;
}

/* Limit modal width for desktop */
@media (min-width: 500px) {
  .modal-content {
    max-width: 400px;
  }
}

@keyframes modalPop {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-content h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #334155;
  margin-bottom: 0.5rem;
}

.modal-content label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #475569;
  gap: 0.3rem;
}

.modal-content input {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  background: #f1f5f9;
  transition: border 0.2s;
  outline: none;
}

.modal-content input:focus {
  border: 1.5px solid #6aa84f;
  background: #fff;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.modal-actions button {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.modal-actions button:first-child {
  background: #6aa84f;
  color: #fff;
}

.modal-actions button:last-child {
  background: #e2e8f0;
  color: #334155;
}

.modal-actions button:hover {
  opacity: 0.85;
}

/* Optional: Close icon in modal */
.modal-close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 1.3rem;
  color: #64748b;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close:hover {
  color: #6aa84f;
}

/* Responsive */
@media (max-width: 900px) {
  .inventory-bg {
    flex-direction: column;
  }
  .inventory-card {
    max-width: 100%;
    height: 400px;
  }
}

/* Responsive */
@media (max-width: 900px) {
  .inventory-bg {
    flex-direction: column;
  }
}
</style>
