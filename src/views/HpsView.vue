<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goPrevPage = () => {
  router.push('/previous') // ilisi sa imong previous route
}

const goNextPage = () => {
  router.push('/next') // ilisi sa imong next route
}
</script>

<template>
  <DashboardView>
    <div class="hps-bg d-flex align-items-center justify-content-between position-relative">

      <!-- Previous Arrow -->
      <button class="arrow-btn prev-btn" @click="goPrevPage">❮</button>

      <!-- Overlay Content -->
      <div class="overlay-content text-white text-start ms-5">
        <!-- Search bar on top -->
        <div class="input-group mb-3 search-box">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search..." 
          />
          <button class="btn btn-light">Go</button>
        </div>

        <h1 class="fw-bold">Household Profiling Services</h1>
        <p>Click to view and manage household records efficiently.</p>

        <!-- View Records Button -->
        <button class="btn view-btn mt-3">View Records</button>
      </div>

      <!-- Next Arrow -->
      <button class="arrow-btn next-btn" @click="goNextPage">❯</button>
    </div>
  </DashboardView>
</template>

<style scoped>
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

/* overlay with transparent green */
.overlay-content {
  background: rgba(91, 132, 30, 0.85); /* transparent #5B841E */
  padding: 2rem;
  border-radius: 1rem;
  max-width: 480px;
  margin-left: 6rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* search bar (no white box wrapper anymore) */
.search-box .form-control {
  border-radius: 0.5rem 0 0 0.5rem;
}
.search-box .btn-light {
  border-radius: 0 0.5rem 0.5rem 0;
}

/* View Records button */
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

/* Arrows */
.arrow-btn {
  background: rgba(0,0,0,0.5);
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
.arrow-btn:hover {
  background: rgba(0,0,0,0.8);
}
.prev-btn {
  position: absolute;
  left: 20px;
}
.next-btn {
  position: absolute;
  right: 20px;
}
</style>
