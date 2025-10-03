<script setup> 
import DashboardView from '@/components/DashboardView.vue'
</script>

<template>
  <DashboardView>
    <div class="report-bg d-flex align-items-center justify-content-center position-relative">
      <div class="overlay-content text-white text-center">
        <h1 class="fw-bold">Reports</h1>
        <p>Generate and view comprehensive reports on health services and records.</p>
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
</style>