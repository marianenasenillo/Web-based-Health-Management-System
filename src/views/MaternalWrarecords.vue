<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'



const wraRecords = ref([])
const router = useRouter()
const goBack = () => router.back()

// Fetch WRA records from Supabase
const fetchWraRecords = async () => {
  const { data, error } = await supabase
    .from('wra_records')
    .select('*')
    .order('lastname', { ascending: true })

  if (error) {
    console.error('Error fetching WRA records:', error.message)
  } else {
    // Map database fields to your table fields if needed
    wraRecords.value = data.map(record => ({
      purok: record.purok,
      lastname: record.lastname,
      firstname: record.firstname,
      middlename: record.middlename,
      suffix: record.suffix,
      age: record.age,
      birthdate: record.birthdate,
      seStatus: record.se_status,
      civilStatus: record.civil_status,
      planoManganak: record.plano_manganak,
      karun: record.karun,
      spacing: record.spacing,
      limiting: record.limiting,
      fecund: record.fecund,
      infecund: record.infecund,
      fbMethod: record.fb_method,
      fbType: record.fb_type,
      fbDate: record.fb_date,
      changeMethod: record.change_method
    }))
  }
}

onMounted(fetchWraRecords)
</script>


<template>
  <DashboardView>
    <div class="maternal-bg">
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="goBack">← Back</button>
      <h2 class="mb-4">Women of Reproductive Age Records</h2>
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
              <th>SE Status</th>
              <th>Civil Status</th>
              <th>Nag plano manganak</th>
              <th>Karun</th>
              <th>Spacing</th>
              <th>Limiting</th>
              <th>Fecund</th>
              <th>Infecund</th>
              <th>FB method used</th>
              <th>Type</th>
              <th>Date</th>
              <th>Gusto mo balhin ug Method</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(record, idx) in wraRecords" :key="idx">
              <td>{{ record.purok }}</td>
              <td>{{ record.lastname }}</td>
              <td>{{ record.firstname }}</td>
              <td>{{ record.middlename }}</td>
              <td>{{ record.suffix }}</td>
              <td>{{ record.age }}</td>
              <td>{{ record.birthdate }}</td>
              <td>{{ record.seStatus }}</td>
              <td>{{ record.civilStatus }}</td>
              <td>{{ record.planoManganak }}</td>
              <td>{{ record.karun ? '✔' : '' }}</td>
              <td>{{ record.spacing ? '✔' : '' }}</td>
              <td>{{ record.limiting ? '✔' : '' }}</td>
              <td>{{ record.fecund ? '✔' : '' }}</td>
              <td>{{ record.infecund ? '✔' : '' }}</td>
              <td>{{ record.fbMethod }}</td>
              <td>{{ record.fbType }}</td>
              <td>{{ record.fbDate }}</td>
              <td>{{ record.changeMethod }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.maternal-bg {
  background: url('/images/maternal.jpg') no-repeat center center;
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
  min-width: 1200px;
}
@media (max-width: 1100px) {
  .table {
    min-width: 900px;
    font-size: 0.92rem;
  }
}
@media (max-width: 700px) {
  .container {
    padding: 0.2rem;
  }
  .table {
    min-width: 700px;
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
    min-width: 500px;
    font-size: 0.85rem;
  }
  th, td {
    padding: 0.18rem 0.25rem !important;
    font-size: 0.85rem;
  }
}
</style>