<script setup>
import { ref, computed } from 'vue';
import DashboardView from '@/components/DashboardView.vue';

// Medicine stock
const medicineStock = ref(50);
const newMedicine = ref({ name: '', brand: '', expiry: '', quantity: 0 });

// Tools list
const tools = ref([
  { name: 'Sphygmomanometer', quantity: 5 },
  { name: 'Height Measuring Tape', quantity: 3 },
]);
const newTool = ref({ name: '', quantity: 1 });

// Computed: disable tool if stock is 0
const availableTools = computed(() =>
  tools.value.map(tool => ({ ...tool, disabled: medicineStock.value <= 0 }))
);

// Add new medicine
const addMedicine = () => {
  if (newMedicine.value.quantity > 0) {
    medicineStock.value += Number(newMedicine.value.quantity);
    newMedicine.value = { name: '', brand: '', expiry: '', quantity: 0 };
  }
};

// Add new tool
const addTool = () => {
  if (newTool.value.name && newTool.value.quantity > 0) {
    tools.value.push({ ...newTool.value });
    newTool.value = { name: '', quantity: 1 };
  }
};

// Avail a tool (decrements stock)
const availTool = (tool) => {
  if (medicineStock.value > 0 && tool.quantity > 0) {
    medicineStock.value--;
  }
};
</script>

<template>
  <DashboardView>
    <div class="inventory-bg">
      <div class="inventory-card">
        <h2>Medicine Stocks</h2>
        <p class="stock-count">{{ medicineStock }}</p>
        <div class="medicine-input">
          <input v-model="newMedicine.name" placeholder="Medicine Name" />
          <input v-model="newMedicine.brand" placeholder="Brand" />
          <input v-model="newMedicine.expiry" type="date" placeholder="Expiry Date" />
          <input v-model.number="newMedicine.quantity" type="number" placeholder="Quantity" min="1"/>
          <button @click="addMedicine">Add</button>
        </div>
      </div>

      <div class="inventory-card">
        <h2>Tools Available</h2>
        <div class="tools-list">
          <div 
            v-for="(tool, index) in availableTools" 
            :key="index" 
            class="tool-item"
            :class="{ disabled: tool.disabled }"
            @click="availTool(tool)"
          >
            {{ tool.name }} ({{ tool.quantity }})
          </div>
        </div>
        <div class="tools-input">
          <input v-model="newTool.name" placeholder="Tool Name" />
          <input v-model.number="newTool.quantity" type="number" min="1" placeholder="Quantity" />
          <button @click="addTool">Add Tool</button>
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
  min-width: 300px;
  background-color: rgba(255,255,255,0.9);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.stock-count {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0;
  text-align: center;
}

.medicine-input, .tools-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.medicine-input input, .tools-input input {
  flex: 1 1 120px;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.medicine-input button, .tools-input button {
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #6aa84f;
  color: white;
  border: none;
  cursor: pointer;
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
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;
}

.tool-item:hover {
  background-color: #e0e0e0;
}

.tool-item.disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 900px) {
  .inventory-bg {
    flex-direction: column;
  }
}
</style>
