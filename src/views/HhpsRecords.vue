<script setup>
// filepath: c:\Users\salar\OneDrive\Desktop\healths\src\views\HhpsRecords.vue
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'

// Sample household head records
const headRecords = ref([
  {
    id: 'HH001',
    purok: '1',
    lastname: 'Dela Cruz',
    firstname: 'Juan',
    middlename: 'Santos',
    suffix: '',
    familyCount: 2,
    population: 5,
    female: 3,
    male: 2,
    address: '123 Main St, Barangay 1'
  },
  {
    id: 'HH002',
    purok: '2',
    lastname: 'Santos',
    firstname: 'Maria',
    middlename: 'Lopez',
    suffix: '',
    familyCount: 1,
    population: 4,
    female: 2,
    male: 2,
    address: '456 Elm St, Barangay 2'
  }
  // Add more records as needed
])
</script>

<template>
  <DashboardView>
    <div class=" container my-4">
      <h2 class="mb-4">Household Head Profiling Records</h2>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-light">
            <tr>
              <th>Household ID</th>
              <th>Purok</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Suffix</th>
              <th>No. of Family per Household</th>
              <th>Population per Household</th>
              <th>No. of Female</th>
              <th>No. of Male</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in headRecords" :key="record.id">
              <td>{{ record.id }}</td>
              <td>{{ record.purok }}</td>
              <td>{{ record.lastname }}</td>
              <td>{{ record.firstname }}</td>
              <td>{{ record.middlename }}</td>
              <td>{{ record.suffix }}</td>
              <td>{{ record.familyCount }}</td>
              <td>{{ record.population }}</td>
              <td>{{ record.female }}</td>
              <td>{{ record.male }}</td>
              <td>{{ record.address }}</td>
              <td>
                <button class="btn btn-primary btn-sm me-2">View</button>
                <button class="btn btn-secondary btn-sm">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardView>
</template>

