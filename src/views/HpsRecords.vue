<script setup>
// filepath: c:\Users\salar\OneDrive\Desktop\healths\src\views\HpsRecords.vue
import DashboardView from '@/components/DashboardView.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()

const goBack = () => {
  router.back()
}

// State
const householdRecords = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch data from Supabase
const fetchHouseholds = async () => {
  try {
    const { data, error: fetchError } = await supabase
      .from('households')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    // Map field names to match template naming (optional)
    householdRecords.value = data.map(h => ({
      id: h.id,
      purok: h.purok,
      dateVisit: h.date_visit,
      householdNo: h.household_no,
      lastname: h.lastname,
      firstname: h.firstname,
      middlename: h.middlename,
      suffix: h.suffix,
      relationship: h.relationship,
      birthdate: h.birthdate,
      age: h.age,
      sex: h.sex,
      civilStatus: h.civil_status,
      education: h.education,
      religion: h.religion,
      ethnicity: h.ethnicity,
      is4psMember: h.is_4ps_member ? 'Yes' : 'No',
      householdId4ps: h.household_id_4ps,
      philhealthId: h.philhealth_id,
      membershipType: h.membership_type,
      philhealthCategory: h.philhealth_category,
      medicalHistory: h.medical_history,
      ageGroup: h.age_group,
      lmp: h.lmp,
      usingFpMethod: h.using_fp_method,
      fpMethodUsed: h.fp_method_used,
      fpStatus: h.fp_status,
      waterSource: h.water_source,
      toiletFacility: h.toilet_facility,
      address: h.address || '—'
    }))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(fetchHouseholds)
</script>

<template>
  <DashboardView>
    <div class="hps-bg">
      <div class="container my-4">
        <button class="btn btn-outline-secondary mb-3" @click="goBack">← Back</button>
        <h2 class="mb-4">Household Profiling Records</h2>

        <div v-if="loading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status"></div>
          <p>Loading records...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead class="table-light">
              <tr>
                <th>Household ID</th>
                <th>Purok</th>
                <th>Date of Visit</th>
                <th>Household No.</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Suffix</th>
                <th>Relationship</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Civil Status</th>
                <th>Education</th>
                <th>Religion</th>
                <th>Ethnicity</th>
                <th>4PS Member</th>
                <th>4PS Household ID</th>
                <th>Philhealth ID No</th>
                <th>Membership Type</th>
                <th>Philhealth Category</th>
                <th>Medical History</th>
                <th>Classification by Age/Health Risk Group</th>
                <th>LMP</th>
                <th>Using FP Method?</th>
                <th>FP Method Used</th>
                <th>FP Status</th>
                <th>Type of Water Source</th>
                <th>Type of Toilet Facility</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in householdRecords" :key="record.id">
                <td>{{ record.id }}</td>
                <td>{{ record.purok }}</td>
                <td>{{ record.dateVisit }}</td>
                <td>{{ record.householdNo }}</td>
                <td>{{ record.lastname }}</td>
                <td>{{ record.firstname }}</td>
                <td>{{ record.middlename }}</td>
                <td>{{ record.suffix }}</td>
                <td>{{ record.relationship }}</td>
                <td>{{ record.birthdate }}</td>
                <td>{{ record.age }}</td>
                <td>{{ record.sex }}</td>
                <td>{{ record.civilStatus }}</td>
                <td>{{ record.education }}</td>
                <td>{{ record.religion }}</td>
                <td>{{ record.ethnicity }}</td>
                <td>{{ record.is4psMember }}</td>
                <td>{{ record.householdId4ps }}</td>
                <td>{{ record.philhealthId }}</td>
                <td>{{ record.membershipType }}</td>
                <td>{{ record.philhealthCategory }}</td>
                <td>{{ record.medicalHistory }}</td>
                <td>{{ record.ageGroup }}</td>
                <td>{{ record.lmp }}</td>
                <td>{{ record.usingFpMethod }}</td>
                <td>{{ record.fpMethodUsed }}</td>
                <td>{{ record.fpStatus }}</td>
                <td>{{ record.waterSource }}</td>
                <td>{{ record.toiletFacility }}</td>
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
  }
}
@media (max-width: 500px) {
  .table {
    min-width: 500px;
    font-size: 0.85rem;
  }
  th, td {
    padding: 0.2rem 0.3rem !important;
  }
}
</style>
