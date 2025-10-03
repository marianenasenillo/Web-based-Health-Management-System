<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'

// Sample Vitamin A Supplementation records
const vitaminARecords = ref([
  {
    purok: '1',
    lastname: 'Dela Cruz',
    firstname: 'Juan',
    middlename: 'Santos',
    suffix: '',
    age: 3,
    birthdate: '2022-05-10',
    gender: 'Male',
    motherName: 'Maria Dela Cruz'
  },
  {
    purok: '2',
    lastname: 'Lopez',
    firstname: 'Anna',
    middlename: 'Reyes',
    suffix: '',
    age: 2,
    birthdate: '2023-03-22',
    gender: 'Female',
    motherName: 'Luisa Lopez'
  }
])
</script>

<template>
  <DashboardView>
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="$router.back()">← Back</button>
      <h2 class="mb-4">Vitamin A Supplementation Records</h2>
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
              <th>Gender</th>
              <th>Full name of Mother</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in vitaminARecords" :key="idx">
              <td>{{ record.purok }}</td>
              <td>{{ record.lastname }}</td>
              <td>{{ record.firstname }}</td>
              <td>{{ record.middlename }}</td>
              <td>{{ record.suffix }}</td>
              <td>{{ record.age }}</td>
              <td>{{ record.birthdate }}</td>
              <td>{{ record.gender }}</td>
              <td>{{ record.motherName }}</td>
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
  min-width: 900px;
}
@media (max-width: 900px) {
  .table {
    min-width: 700px;
    font-size: 0.92rem;
  }
}
@media (max-width: 700px) {
  .container {
    padding: 0.2rem;
  }
  .table {
    min-width: 500px;
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