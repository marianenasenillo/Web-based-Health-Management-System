<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showRecords = ref(false)
const activeMenu = ref('') // '' | 'responsible'
const showModal = ref(false)
const modalType = ref('') // 'responsible'

// Form fields for Responsible Parenthood and Planning
const surname = ref('')
const firstname = ref('')
const motherName = ref('')
const sex = ref('')
const birthday = ref('')
const age = ref('')

const goPrevPage = () => {
  router.push('/childcare')
}
const goNextPage = () => {
  router.push('/preventivehealhservices')
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
  if (type === 'responsible') {
    router.push('/fpsrecords')
  }
  closeMenu()
}
const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <DashboardView>
    <div class="family-bg d-flex align-items-center justify-content-between position-relative">
      <!-- Previous Arrow -->
      <button class="arrow-btn prev-btn" @click="goPrevPage">❮</button>

      <!-- Overlay Content -->
      <div class="overlay-content text-white text-start ms-5">
        <!-- Search bar -->
        <div class="input-group mb-3 search-box">
          <input type="text" class="form-control" placeholder="Search..." />
          <button class="btn btn-light">Go</button>
        </div>

        <h1 class="fw-bold">Family Planning Services</h1>
        <p>Click to view and manage Family Planning Services records efficiently.</p>

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

        <img src="/images/familyplanninglogo.png" alt="Family Planning Logo" class="family-logo" />

        <!-- Text + Buttons -->
        <div class="records-content">
          <p>
            <em>
              “Family Planning Services” in the Barangay Health Station aim to help families make informed choices in managing reproductive health and achieving responsible parenthood.
            </em>
          </p>

          <!-- Responsible Parenthood and Planning Button with Dropdown -->
          <div class="dropdown-container">
            <button class="record-btn" @click="openMenu('responsible')">
              Responsible Parenthood and Planning <span>⋮</span>
            </button>
            <div v-if="activeMenu === 'responsible'" class="dropdown-menu">
              <button @click="fillIn('responsible')">Fill In</button>
              <button @click="viewRecords('responsible')">View Records</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Responsible Parenthood and Planning Fill In Form -->
    <div v-if="showModal && modalType === 'responsible'" class="modal-overlay">
      <div class="modal-box wide-modal">
        <button class="modal-close" @click="closeModal" style="float:right;">✕</button>
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
             Responsible Parenthood  and Planning
            </h2>
          </div>
          <img src="/images/barangaylogo.png" alt="Barangay Logo" style="height: 80px;" />
        </div>
        <hr />
        <form @submit.prevent="closeModal" class="responsible-form">
          <div class="row-fields">
            <div class="form-group">
              <label>Surname:</label>
              <input type="text" v-model="surname" class="input-stroke" />
            </div>
            <div class="form-group">
              <label>First Name:</label>
              <input type="text" v-model="firstname" class="input-stroke" />
            </div>
          </div>
          <div class="row-fields">
            <div class="form-group">
              <label>Name of Mother:</label>
              <input type="text" v-model="motherName" class="input-stroke" />
            </div>
            <div class="form-group">
              <label>Sex:</label>
              <select v-model="sex" class="input-stroke">
                <option value="">Select</option>
                <option value="F">Female</option>
                <option value="M">Male</option>
              </select>
            </div>
          </div>
          <div class="row-fields">
            <div class="form-group">
              <label>Birthday:</label>
              <input type="date" v-model="birthday" class="input-stroke" />
            </div>
            <div class="form-group">
              <label>Age in years:</label>
              <input type="number" v-model="age" class="input-stroke" min="0" />
            </div>
          </div>
          <div class="form-actions-left">
            <button type="button" class="modal-btn cancel-btn" @click="closeModal">Cancel</button>
            <button type="submit" class="modal-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
/* Background */
.family-bg {
  background: url('/images/familyplanning-bg.jpg') no-repeat center center;
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
  width: 65px;
  height: 65px;
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
  font-size: 1.35rem;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.back-btn:hover {
  transform: scale(1.1);
}

/* Logo */
.family-logo {
  width: 520px;
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

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 2rem;
}
.modal-box {
  background: #fff;
  padding: 3rem 4rem;
  border-radius: 1rem;
  max-width: 800px;
  width: 100%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #000;
  cursor: pointer;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.modal-logo-col {
  flex: 0 0 80px;
}
.modal-title-col {
  flex: 1;
  text-align: center;
}
.modal-title-col h4 {
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.2;
}
.modal-title-col h2 {
  font-size: 1.5rem;
  margin: 0.5rem 0 0;
  font-weight: 600;
}
.responsible-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.row-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.form-group {
  flex: 1;
  min-width: 220px;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.input-stroke {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.8rem;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;
}
.input-stroke:focus {
  border-color: #5b841e;
  outline: none;
}
.form-actions-left {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
.modal-btn {
  background-color: #5b841e;
  color: #fff;
  font-weight: 600;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}
.modal-btn:hover {
  background-color: #4a6d18;
}
.cancel-btn {
  background-color: #ccc;
  color: #000;
}
.cancel-btn:hover {
  background-color: #bbb;
}
</style>
