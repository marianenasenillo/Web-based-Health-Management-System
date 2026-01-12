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
    <div class="container">
      <div class="records-top d-flex align-items-center mb-2">
        <button class="btn btn-outline-secondary me-3" @click="$router.back()">← Back</button>
        <h3 class="mb-0">Responsible Parenthood and Planning Records</h3>
        <div class="ms-auto search-box"></div>
      </div>

      <div class="table-wrapper">
        <div class="table-responsive large-table">
          <table class="table table-bordered table-hover mb-0">
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
    </div>
  </DashboardView>
</template>

<style scoped>
.family-bg {
  background: url('/images/familyplanning-bg.jpg') no-repeat center center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal { overflow-y: auto }

.records-top { align-items: center }
.search-box { max-width: 540px }
.search-input { border-radius: 28px 0 0 28px }
.search-btn { border-radius: 0 28px 28px 0 }
.table-wrapper { border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.95); }
.table-wrapper { height: calc(100vh - 260px); display: flex; flex-direction: column; }
.table-responsive.large-table { flex: 1 1 auto; height: 100%; overflow: auto }
.large-table table { font-size: 1.05rem; margin-bottom: 0 }
.large-table thead th { padding: 1rem; font-size: 1rem; position: sticky; top: 0; background: #fff; z-index: 5 }
.large-table tbody td { padding: 0.9rem }

@media (max-width: 768px) {
  .search-box { max-width: 100% }
  .large-table thead th { font-size: 0.95rem }
}
</style>