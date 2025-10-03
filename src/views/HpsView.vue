<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showRecords = ref(false)

// Dropdown menu state
const activeMenu = ref('') // '' | 'household' | 'head'

// Modal state
const showModal = ref(false)
const modalType = ref('') // 'household' | 'head'

const goPrevPage = () => {
  router.push('/home')
}
const goNextPage = () => {
  router.push('/maternalservices')
}
const toggleRecords = () => {
  showRecords.value = !showRecords.value
}
const openMenu = (type) => {
  activeMenu.value = type
}
const closeMenu = () => {
  activeMenu.value = ''
}
const fillIn = (type) => {
  modalType.value = type
  showModal.value = true
  closeMenu()
}
const viewRecords = (type) => {
  // Add navigation or logic for viewing records
  closeMenu()
}
const closeModal = () => {
  showModal.value = false
}
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

        <!-- Text + Buttons -->
        <div class="records-content">
          <p>
            <em>"Household Profiling"</em> in the Barangay Health Station aims to gather and
            organize essential information about families in the community to support health
            planning, monitoring, and delivery of services.
          </p>

          <!-- Household Profiling Button with Dropdown -->
          <div class="dropdown-container">
            <button class="record-btn" @click="openMenu('household')">
              Household Profiling <span>⋮</span>
            </button>
            <div v-if="activeMenu === 'household'" class="dropdown-menu">
              <button @click="fillIn('household')">Fill In</button>
              <button @click="viewRecords('household')">View Records</button>
            </div>
          </div>

          <!-- Household Head Profiling Button with Dropdown -->
          <div class="dropdown-container">
            <button class="record-btn" @click="openMenu('head')">
              Household Head Profiling <span>⋮</span>
            </button>
            <div v-if="activeMenu === 'head'" class="dropdown-menu">
              <button @click="fillIn('head')">Fill In</button>
              <button @click="viewRecords('head')">View Records</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Fill In Form -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box" style="max-width:700px; width:98vw; padding:1.2rem 1.5rem;">
        <button class="modal-close" @click="closeModal" style="float:right;">✕</button>
        <!-- Centered logos and header text -->
        <div style="display: flex; align-items: center; justify-content: center; gap: 1.2rem; margin-bottom: 0.3rem;">
          <img src="/images/agusanlogo.png" alt="Agusan Logo" style="height: 80px;" />
          <div style="min-width:180px; flex:1; text-align: center;">
            <h4 style="margin: 0; font-size: 0.9rem; font-weight: 600; line-height: 1.1;">
              Republic of the Philippines<br />
              Province of Agusan del Norte<br />
              Municipality of Buenavista<br />
              Barangay Poblacion ___
            </h4>
            <h2 style="margin: 0.2rem 0 0.1rem 0; font-size: 0.95rem; font-weight: 700;">
              Household Profiling
            </h2>
          </div>
          <img src="/images/barangaylogo.png" alt="Barangay Logo" style="height: 80px;" />
        </div>
        <hr />
        <form style="display:flex; flex-direction:column; gap:0.15rem; margin-top:0.2rem;">
          <div style="display: flex; gap: 0.15rem;">
            <div style="flex:0.7;">
              <label for="purok" style="font-weight:600; font-size:0.9rem;">Purok:</label>
              <input id="purok" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="lastname" style="font-weight:600; font-size:0.9rem;">Last Name:</label>
              <input id="lastname" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="firstname" style="font-weight:600; font-size:0.9rem;">First Name:</label>
              <input id="firstname" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="middlename" style="font-weight:600; font-size:0.9rem;">Middle Name:</label>
              <input id="middlename" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:0.7;">
              <label for="suffix" style="font-weight:600; font-size:0.9rem;">Suffix:</label>
              <input id="suffix" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
          </div>
          <div style="display: flex; gap: 0.15rem;">
            <div style="flex:0.5;">
              <label for="age" style="font-weight:600; font-size:0.9rem;">Age:</label>
              <input id="age" type="number" class="input-stroke" min="0" style="width:45px; padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="birthdate" style="font-weight:600; font-size:0.9rem;">Birthdate:</label>
              <input id="birthdate" type="date" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="seStatus" style="font-weight:600; font-size:0.9rem;">SE Status:</label>
              <input id="seStatus" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div style="flex:1;">
              <label for="civilStatus" style="font-weight:600; font-size:0.9rem;">Civil Status:</label>
              <input id="civilStatus" type="text" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
          </div>
          <div style="display: flex; gap: 0.15rem;">
            <div style="flex:1;">
              <label for="planoManganak" style="font-weight:600; font-size:0.9rem;">Nag plano manganak:</label>
              <select id="planoManganak" class="input-stroke" style="padding:0.15rem 0.4rem; font-size:0.9rem;">
                <option value="">--Pili--</option>
                <option value="Oo">Oo</option>
                <option value="Dili">Dili</option>
              </select>
            </div>
            <div style="flex:2;">
              <label style="font-weight:600; font-size:0.9rem;">Karun / Spacing / Limiting / Fecund / Infecund:</label>
              <div style="display: flex; gap: 0.2rem;">
                <label style="font-size:0.9rem;"><input type="checkbox" /> Karun</label>
                <label style="font-size:0.9rem;"><input type="checkbox" /> Spacing</label>
                <label style="font-size:0.9rem;"><input type="checkbox" /> Limiting</label>
                <label style="font-size:0.9rem;"><input type="checkbox" /> Fecund</label>
                <label style="font-size:0.9rem;"><input type="checkbox" /> Infecund</label>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 0.15rem;">
            <div>
              <label style="font-weight:600; font-size:0.9rem;">FB method used:</label>
              <input type="text" class="input-stroke" style="width:55px; padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.9rem;">Type:</label>
              <input type="text" class="input-stroke" style="width:55px; padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.9rem;">Date:</label>
              <input type="date" class="input-stroke" style="width:70px; padding:0.15rem 0.4rem; font-size:0.9rem;" />
            </div>
            <div>
              <label style="font-weight:600; font-size:0.9rem;">Gusto mo balhin ug Method:</label>
              <label style="font-size:0.9rem;"><input type="radio" name="changeMethod" /> Yes</label>
              <label style="font-size:0.9rem;"><input type="radio" name="changeMethod" /> No</label>
            </div>
          </div>
          <div style="display: flex; gap: 0.7rem; margin-top:0.5rem;">
            <button type="button" class="modal-btn cancel-btn" @click="closeModal" style="font-size:0.95rem; padding:0.4rem 1rem; background:#888; color:#fff;">Cancel</button>
            <button type="submit" class="modal-btn" style="font-size:0.95rem; padding:0.4rem 1rem;">Save</button>
          </div>
        </form>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
/* Background */
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

/* Overlay with transparent green */
.overlay-content {
  background: rgba(131, 189, 45, 0.65);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 480px;
  margin-left: 6rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

/* Search bar */
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
.arrow-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}
.prev-btn {
  position: absolute;
  left: 20px;
}
.next-btn {
  position: absolute;
  right: 20px;
}

/* Records overlay (fullscreen) */
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

/* Records box */
.records-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 4rem;
  border-radius: 1rem;
  max-width: 1300px;
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
.back-btn:hover {
  transform: scale(1.1);
}

/* Logo */
.hps-logo {
  width: 500px;
  flex-shrink: 0;
}

/* Content */
.records-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.records-content p {
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Buttons */
.record-btn {
  background-color: #5b841e;
  color: #fff;
  font-weight: 600;
  padding: 1rem 1.3rem;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  transition: 0.3s;
}
.record-btn:hover {
  background-color: #4a6d18;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 3000;
}
.modal-box {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  min-width: 320px;
  text-align: center;
}
.modal-btn {
  background: #5b841e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  margin: 0.5rem 0;
  font-weight: 600;
  width: 100%;
  font-size: 1rem;
  transition: 0.3s;
}
.modal-btn:hover {
  background: #4a6d18;
}
.modal-close {
  background: transparent;
  color: #333;
  border: none;
  margin-top: 1rem;
  font-size: 1rem;
  cursor: pointer;
}

/* Dropdown styles */
.dropdown-container {
  position: relative;
  width: 100%;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  padding: 0.5rem 0.7rem;
  min-width: 140px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.dropdown-menu button {
  background: none;
  border: none;
  color: #5b841e;
  font-weight: 600;
  text-align: left;
  padding: 0.5rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.dropdown-menu button:hover {
  background: #e6f3d2;
}

/* Input styles */
.input-stroke {
  border: 2px solid #222;
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  background: #fff;
  color: #222;
  outline: none;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
.input-stroke:focus {
  border-color: #5b841e;
}

.cancel-btn {
  background: #888 !important;
  color: #fff !important;
}
.cancel-btn:hover {
  background: #555 !important;
}
</style>
