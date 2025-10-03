<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => {
  router.back()
}

// Sample records for Cervical Cancer Screening
const cervicalRecords = ref([
  {
    purok: '1',
    lastname: 'Dela Cruz',
    firstname: 'Maria',
    middlename: 'Santos',
    suffix: '',
    age: 45,
    birthdate: '1980-05-10',
    screened: 'Yes'
  },
  {
    purok: '2',
    lastname: 'Lopez',
    firstname: 'Anna',
    middlename: 'Reyes',
    suffix: '',
    age: 38,
    birthdate: '1987-03-22',
    screened: 'No'
  }
])
</script>

<template>
  <DashboardView>
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="goBack">← Back</button>
      <h2 class="mb-4">Cervical Cancer Screening Records</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Purok</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Suffix</th>
              <th>Age</th>
              <th>Birthdate</th>
              <th>Screened</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in cervicalRecords" :key="idx">
              <td>{{ record.purok }}</td>
              <td>{{ record.lastname }}</td>
              <td>{{ record.firstname }}</td>
              <td>{{ record.middlename }}</td>
              <td>{{ record.suffix }}</td>
              <td>{{ record.age }}</td>
              <td>{{ record.birthdate }}</td>
              <td>{{ record.screened }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
.table {
  font-size: 0.95rem;
  min-width: 700px;
}
@media (max-width: 900px) {
  .table {
    min-width: 600px;
    font-size: 0.92rem;
  }
}
@media (max-width: 700px) {
  .container {
    padding: 0.2rem;
  }
  .table {
    min-width: 400px;
    font-size: 0.9rem;
  }
  th, td {
    padding: 0.3rem 0.5rem !important;
    white-space: nowrap;
    font-size: 0.92rem;
  }
}
@media (max-width: 500px) {
  .container {
    padding: 0.1rem;
  }
  .table {
    min-width: 300px;
    font-size: 0.85rem;
  }
  th, td {
    padding: 0.18rem 0.25rem !important;
    font-size: 0.85rem;
  }
}
</style>