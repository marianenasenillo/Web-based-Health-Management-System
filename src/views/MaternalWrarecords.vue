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
    <div class="container">
      <div class="records-top d-flex align-items-center mb-2">
        <button class="btn btn-outline-secondary me-3" @click="goBack">← Back</button>
        <h3 class="mb-0">Women of Reproductive Age Records</h3>
        <div class="ms-auto search-box"></div>
      </div>

      <div class="table-wrapper">
        <div class="table-responsive large-table">
          <table class="table table-bordered table-hover mb-0">
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
    </div>
  </DashboardView>
</template>

<style scoped>
.maternal-bg {
  background: url('/images/maternal.jpg') no-repeat center center;
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