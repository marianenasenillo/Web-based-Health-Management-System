<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const dewormingRecords = ref([])

// Fetch records from Supabase
const fetchRecords = async () => {
  const { data, error } = await supabase
    .from('deworming_records')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    console.error('Error fetching deworming records:', error)
  } else {
    // Map field names for display if necessary
    dewormingRecords.value = data.map(item => ({
      firstname: item.firstname,
      middlename: item.middlename,
      motherName: item.mother_name,
      sex: item.sex,
      birthday: item.birthday,
      age: item.age
    }))
  }
}

// Fetch on component mount
onMounted(() => {
  fetchRecords()
})
</script>

<template>
  <DashboardView>
    <div class="preventive-bg">
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="$router.back()">← Back</button>
      <h2 class="mb-4">Deworming (10–19 yrs old) Records</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Name of Mother</th>
              <th>Sex</th>
              <th>Birthday</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in dewormingRecords" :key="idx">
              <td>{{ record.firstname }}</td>
              <td>{{ record.middlename }}</td>
              <td>{{ record.motherName }}</td>
              <td>{{ record.sex }}</td>
              <td>{{ record.birthday }}</td>
              <td>{{ record.age }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.preventive-bg {
  background: url('/images/preventivehealth.jpg') no-repeat center center;
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
  min-width: 700px;
}
@media (max-width: 900px) {
  .table {
    min-width: 500px;
    font-size: 0.92rem;
  }
}
@media (max-width: 700px) {
  .container {
    padding: 0.2rem;
  }
  .table {
    min-width: 350px;
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
    min-width: 250px;
    font-size: 0.85rem;
  }
  th, td {
    padding: 0.18rem 0.25rem !important;
    font-size: 0.85rem;
  }
}
</style>