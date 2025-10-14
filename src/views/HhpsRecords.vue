<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()
const goBack = () => router.back()

const loading = ref(true)
const error = ref(null)
const headRecords = ref([])

const selectedHead = ref(null)
const showMembersModal = ref(false)
const members = ref([])

onMounted(async () => {
  await fetchHeadRecords()
})

const fetchHeadRecords = async () => {
  loading.value = true
  error.value = null
  try {
    const { data, error: err } = await supabase
      .from('household_heads')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) throw err
    headRecords.value = data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load household head records.'
  } finally {
    loading.value = false
  }
}

// View Members
const viewMembers = async (head) => {
  selectedHead.value = head
  showMembersModal.value = true
  members.value = []
  try {
    // ✅ Adjust this based on your real column name
    const { data, error: err } = await supabase
      .from('household_members')
      .select('*')
      .eq('head_id', head.head_id) // if your PK is head_id instead of id

    if (err) throw err
    members.value = data
  } catch (e) {
    console.error(e)
    alert('Error loading household members.')
  }
}
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
          <table class="table table-bordered table-striped">
            <thead class="table-light">
              <tr>
                <th>Head ID</th>
                <th>Purok</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Suffix</th>
                <th>No. of Families</th>
                <th>Population</th>
                <th>Female</th>
                <th>Male</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in headRecords" :key="record.head_id">
  <td>{{ record.head_id }}</td>
  <td>{{ record.purok }}</td>
  <td>{{ record.lastname }}</td>
  <td>{{ record.firstname }}</td>
  <td>{{ record.middlename }}</td>
  <td>{{ record.suffix }}</td>
  <td>{{ record.no_of_families }}</td>
  <td>{{ record.population }}</td>
  <td>{{ record.female_count }}</td>
  <td>{{ record.male_count }}</td>
  <td>
    <button
      class="btn btn-primary btn-sm me-2"
      @click="viewMembers(record)"
    >
      View Members
    </button>
    <button class="btn btn-secondary btn-sm">Edit</button>
  </td>
</tr>

              <tr v-if="headRecords.length === 0">
                <td colspan="11" class="text-center">No records found.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal for Members -->
        <div
          class="modal fade show d-block"
          tabindex="-1"
          v-if="showMembersModal"
          style="background: rgba(0,0,0,0.6)"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  Members of: {{ selectedHead.firstname }} {{ selectedHead.lastname }}
                </h5>
                <button type="button" class="btn-close" @click="showMembersModal = false"></button>
              </div>
              <div class="modal-body">
                <div v-if="members.length === 0" class="text-center py-3">
                  <p>No members found for this head.</p>
                </div>

                <div v-else class="table-responsive">
                  <table class="table table-bordered">
                    <thead class="table-light">
                      <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Relationship</th>
                        <th>Birthdate</th>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>Civil Status</th>
                        <th>Education</th>
                        <th>Religion</th>
                        <th>Ethnicity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="m in members" :key="m.id">
                        <td>{{ m.lastname }}</td>
                        <td>{{ m.firstname }}</td>
                        <td>{{ m.middlename }}</td>
                        <td>{{ m.relationship }}</td>
                        <td>{{ m.birthdate }}</td>
                        <td>{{ m.age }}</td>
                        <td>{{ m.sex }}</td>
                        <td>{{ m.civil_status }}</td>
                        <td>{{ m.education }}</td>
                        <td>{{ m.religion }}</td>
                        <td>{{ m.ethnicity }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" @click="showMembersModal = false">
                  Close
                </button>
              </div>
            </div>
          </div>
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
.modal {
  overflow-y: auto;
}
</style>
