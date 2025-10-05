<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'


// Records
const vitaminARecords = ref([])

// Fetch records from Supabase table
const fetchVitaminARecords = async () => {
  const { data, error } = await supabase
    .from('childcare_vitamina_records')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching records:', error)
    return
  }

  vitaminARecords.value = data.map(record => ({
    purok: record.purok,
    lastname: record.lastname,
    firstname: record.firstname,
    middlename: record.middlename,
    suffix: record.suffix,
    age: record.age,
    birthdate: record.birthdate ? record.birthdate.slice(0, 10) : '',
    gender: record.gender,
    motherName: record.mother_name
  }))
}

// Fetch on page load
onMounted(() => {
  fetchVitaminARecords()
})
</script>


<template>
  <DashboardView>
    <div class="childcare-bg">
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
    </div>
  </DashboardView>
</template>

<style scoped>
.childcare-bg {
  background: url('/images/childcare.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 4rem;
}
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