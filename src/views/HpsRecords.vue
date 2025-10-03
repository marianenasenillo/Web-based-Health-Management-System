<script setup>
// filepath: c:\Users\salar\OneDrive\Desktop\healths\src\views\HpsRecords.vue
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

// Sample household profiling records
const householdRecords = ref([
  {
    id: 'HH001',
    purok: '1',
    dateVisit: '2025-10-01',
    householdNo: '001',
    lastname: 'Dela Cruz',
    firstname: 'Juan',
    middlename: 'Santos',
    suffix: '',
    relationship: 'Head',
    birthdate: '1980-05-10',
    age: 45,
    sex: 'Male',
    civilStatus: 'Married',
    education: 'College',
    religion: 'Catholic',
    ethnicity: 'Non-IP',
    is4psMember: 'No',
    householdId4ps: '',
    philhealthId: 'PH123456',
    membershipType: 'M-member',
    philhealthCategory: 'DC',
    medicalHistory: 'HPN',
    ageGroup: 'Adult',
    lmp: '',
    usingFpMethod: 'No',
    fpMethodUsed: '',
    fpStatus: '',
    waterSource: 'Deep Well',
    toiletFacility: 'Flush',
    address: '123 Main St, Barangay 1'
  },
  {
    id: 'HH002',
    purok: '2',
    dateVisit: '2025-10-02',
    householdNo: '002',
    lastname: 'Santos',
    firstname: 'Maria',
    middlename: 'Lopez',
    suffix: '',
    relationship: 'Spouse',
    birthdate: '1982-03-15',
    age: 43,
    sex: 'Female',
    civilStatus: 'Married',
    education: 'High School',
    religion: 'Catholic',
    ethnicity: 'IP',
    is4psMember: 'Yes',
    householdId4ps: '4PS002',
    philhealthId: 'PH654321',
    membershipType: 'D-dependent',
    philhealthCategory: 'IC',
    medicalHistory: 'DM',
    ageGroup: 'Adult',
    lmp: '2025-09-15',
    usingFpMethod: 'Yes',
    fpMethodUsed: 'Pills',
    fpStatus: 'Active',
    waterSource: 'Spring',
    toiletFacility: 'Pit Latrine',
    address: '456 Elm St, Barangay 2'
  }
  // Add more records as needed
])
</script>

<template>
  <DashboardView>
    <div class="container my-4">
      <button class="btn btn-outline-secondary mb-3" @click="goBack">← Back</button>
      <h2 class="mb-4">Household Profiling Records</h2>
      <div class="table-responsive">
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
  </DashboardView>
</template>

<style scoped>
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