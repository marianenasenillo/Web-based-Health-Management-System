<script setup>
import DashboardView from '@/components/DashboardView.vue'
</script>

<template>
  <DashboardView>
    <!-- FULL BACKGROUND WRAPPER -->
    <div class="home-bg">
      <!-- Optional overlay content -->
      <div class="overlay-content">
        <h1>Welcome to Dashboard</h1>
        <p>This is the home page with full background.</p>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.home-bg {
  background: url('/images/bg.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px); 
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
