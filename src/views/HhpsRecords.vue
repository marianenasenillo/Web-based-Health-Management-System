<script setup>
// filepath: c:\Users\salar\OneDrive\Desktop\healths\src\views\HhpsRecords.vue
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()
const goBack = () => {
  router.back()
}

const headRecords = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch household heads from Supabase
const fetchHouseholdHeads = async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from('household_heads')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    // Map snake_case from DB → camelCase for your template
    headRecords.value = data.map(h => ({
      id: h.id,
      purok: h.purok,
      lastname: h.lastname,
      firstname: h.firstname,
      middlename: h.middlename,
      suffix: h.suffix,
      familyCount: h.family_count,
      population: h.population,
      female: h.female_count,
      male: h.male_count,
      address: h.address || '—'
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchHouseholdHeads)
</script>

<template>
  <DashboardView>
    <div class="hps-bg">
      <div class="container my-4">
        <button class="btn btn-outline-secondary mb-3" @click="goBack">← Back</button>
        <h2 class="mb-4">Household Head Profiling Records</h2>

        <div v-if="loading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status"></div>
          <p>Loading records...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else class="table-responsive">
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
    </div>
  </DashboardView>
</template>

<style scoped>
.hps-bg {
  background: url('/images/householdprofiling.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 4rem;
}
</style>
