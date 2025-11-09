<script setup>
import DashboardView from '@/components/DashboardView.vue'
import ReportOne from '@/components/reports/ReportOne.vue'
import ReportTwo from '@/components/reports/ReportTwo.vue'
import ReportThree from '@/components/reports/ReportThree.vue'

import { ref } from 'vue'

const showReport = ref(false)
const step = ref(1)

const openReport = () => {
  showReport.value = true
  step.value = 1
}
const closeReport = () => (showReport.value = false)
const nextStep = () => step.value++
const prevStep = () => step.value--
</script>

<template>
  <DashboardView>
    <div class="report-bg d-flex align-items-center position-relative">
      <div class="overlay-content text-white text-start">
        <h1 class="fw-bold">Health Summary Report</h1>
        <p>Click below to view the Health Summary Report for Barangay 5.</p>
        <button class="btn view-btn mt-3" @click="openReport">View Report</button>
      </div>

      <div v-if="showReport" class="records-overlay">
        <div class="records-box d-flex flex-column align-items-center">
          <button class="back-btn align-self-start" @click="closeReport">← back</button>
          <div class="report-container py-4 bg-white shadow rounded">
            <ReportOne v-if="step === 1" @next="nextStep" />
            <ReportTwo v-else-if="step === 2" @next="nextStep" @prev="prevStep" />
            <ReportThree v-else-if="step === 3" @prev="prevStep" />
          </div>
        </div>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.report-bg {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: url('/images/bg.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
}
.overlay-content {
  background: rgba(131, 189, 45, 0.65);
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
.view-btn:hover {
  background-color: #e6b800;
}
.records-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
}
.records-box {
  background: rgba(162, 163, 160, 0.65);
  padding: 3rem 4rem;
  border-radius: 1rem;
  max-width: 1300px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.back-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  font-weight: bold;
  color: #000;
  font-size: 1.35rem;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.back-btn:hover {
  transform: scale(1.1);
}
.report-container {
  max-width: 1100px;
  padding-left: 3rem;
  padding-right: 3rem;
  max-height: 80vh;      /* NEW: limit height */
  overflow-y: auto;      /* NEW: enable vertical scroll */
}
</style>
