<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const responsibleRecords = ref([])

// Fetch records from Supabase
const fetchRecords = async () => {
  const { data, error } = await supabase
    .from('family_planning_records')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching records:', error)
    return
  }

  responsibleRecords.value = data.map(record => ({
    surname: record.surname,
    firstname: record.firstname,
    motherName: record.mother_name,
    sex: record.sex,
    birthday: record.birthday,
    age: record.age
  }))
}

onMounted(() => {
  fetchRecords()
})
</script>


<template>
  <DashboardView>
    <div class="family-bg">
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="$router.back()">← Back</button>
      <h2 class="mb-4">Responsible Parenthood and Planning Records</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>Surname</th>
              <th>First Name</th>
              <th>Name of Mother</th>
              <th>Sex</th>
              <th>Birthday</th>
              <th>Age in years</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in responsibleRecords" :key="idx">
              <td>{{ record.surname }}</td>
              <td>{{ record.firstname }}</td>
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