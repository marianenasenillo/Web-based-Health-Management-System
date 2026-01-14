<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Pie } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const loading = ref(true)
const error = ref(null)
const wraRecords = ref([])
const userBarangay = ref('')

onMounted(async () => {
  await fetchWraRecords()
})

// Fetch WRA records from Supabase
const fetchWraRecords = async () => {
  loading.value = true
  error.value = null
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Not authenticated')

    const userBarangayValue = user.user_metadata?.barangay
    if (!userBarangayValue) throw new Error('No barangay assigned')

    userBarangay.value = userBarangayValue

    const { data, error: err } = await supabase
      .from('wra_records')
      .select('*')
      .eq('is_archived', false)
      .order('created_at', { ascending: false })

    if (err) throw err
    wraRecords.value = data
  } catch (e) {
    console.error('Error fetching WRA records:', e)
    error.value = 'Failed to load WRA records.'
  } finally {
    loading.value = false
  }
}

// Chart data for WRA by Purok
const purokChartData = computed(() => {
  const purokCounts = {}
  wraRecords.value.forEach(record => {
    const purok = record.purok || 'Unknown'
    purokCounts[purok] = (purokCounts[purok] || 0) + 1
  })

  return {
    labels: Object.keys(purokCounts),
    datasets: [{
      label: 'Number of WRA Records',
      data: Object.values(purokCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  }
})

// Chart data for SE Status
const seStatusChartData = computed(() => {
  const statusCounts = { Eligible: 0, 'Not Eligible': 0 }
  wraRecords.value.forEach(record => {
    const status = record.se_status || 'Not Eligible'
    statusCounts[status] = (statusCounts[status] || 0) + 1
  })

  return {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(255, 99, 132, 0.6)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1
    }]
  }
})

// Chart data for Civil Status
const civilStatusChartData = computed(() => {
  const statusCounts = {}
  wraRecords.value.forEach(record => {
    const status = record.civil_status || 'Unknown'
    statusCounts[status] = (statusCounts[status] || 0) + 1
  })

  return {
    labels: Object.keys(statusCounts),
    datasets: [{
      label: 'Civil Status Distribution',
      data: Object.values(statusCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'WRA Records Analysis'
    }
  }
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    }
  }
}
</script>

<template>
  <div class="wra-report">
    <!-- Official Header -->
    <div class="header-section text-center mb-4">
      <div class="official-logo mb-3">
        <img src="/images/logo.png" alt="Barangay Logo" class="logo-img" />
      </div>
      <h2 class="mb-1">Republic of the Philippines</h2>
      <h3 class="mb-1">Province of Cebu</h3>
      <h4 class="mb-1">Municipality of {{ userBarangay }}</h4>
      <h1 class="report-title mb-3">Women of Reproductive Age (WRA) Records Report</h1>
      <p class="report-date">Generated on: {{ new Date().toLocaleDateString() }}</p>
    </div>

    <!-- Executive Summary -->
    <div class="summary-section mb-4">
      <h3 class="section-title">Executive Summary</h3>
      <div class="summary-content">
        <p><strong>Total WRA Records:</strong> {{ wraRecords.length }}</p>
        <p><strong>Barangay:</strong> {{ userBarangay }}</p>
        <p><strong>Report Period:</strong> All time</p>
        <p>This report provides a comprehensive analysis of Women of Reproductive Age (WRA) records, including demographic distribution, eligibility status, and family planning information.</p>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="charts-section mb-4">
      <h3 class="section-title">Data Analysis</h3>

      <!-- Purok Distribution -->
      <div class="chart-container mb-4">
        <h4>WRA Records by Purok</h4>
        <div class="chart-wrapper">
          <Bar :data="purokChartData" :options="chartOptions" />
        </div>
        <p class="chart-explanation">This chart shows the distribution of WRA records across different puroks in the barangay.</p>
      </div>

      <!-- SE Status Pie Chart -->
      <div class="chart-container mb-4">
        <h4>SE Status Distribution</h4>
        <div class="chart-wrapper">
          <Pie :data="seStatusChartData" :options="pieOptions" />
        </div>
        <p class="chart-explanation">This pie chart illustrates the proportion of eligible vs non-eligible women for family planning services.</p>
      </div>

      <!-- Civil Status Bar Chart -->
      <div class="chart-container mb-4">
        <h4>Civil Status Distribution</h4>
        <div class="chart-wrapper">
          <Bar :data="civilStatusChartData" :options="chartOptions" />
        </div>
        <p class="chart-explanation">This chart displays the civil status distribution among WRA records.</p>
      </div>
    </div>

    <!-- Detailed Records Table -->
    <div class="table-section">
      <h3 class="section-title">Detailed Records</h3>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="table-dark">
            <tr>
              <th>Purok</th>
              <th>Name</th>
              <th>Age</th>
              <th>SE Status</th>
              <th>Civil Status</th>
              <th>Family Planning</th>
              <th>FB Method</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in wraRecords" :key="record.id">
              <td>{{ record.purok }}</td>
              <td>{{ record.firstname }} {{ record.middlename }} {{ record.lastname }} {{ record.suffix }}</td>
              <td>{{ record.age }}</td>
              <td>{{ record.se_status }}</td>
              <td>{{ record.civil_status }}</td>
              <td>
                <span v-if="record.karun">Karun </span>
                <span v-if="record.spacing">Spacing </span>
                <span v-if="record.limiting">Limiting </span>
                <span v-if="record.fecund">Fecund </span>
                <span v-if="record.infecund">Infecund</span>
              </td>
              <td>{{ record.fb_method }} {{ record.fb_type }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-section text-center mt-4">
      <p class="mb-1">This report was generated automatically by the Barangay Health Management System</p>
      <p class="mb-0">For official use only</p>
    </div>
  </div>
</template>

<style scoped>
.wra-report {
  font-family: 'Arial', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  color: #333;
}

.header-section {
  border-bottom: 3px solid #007bff;
  padding-bottom: 20px;
}

.official-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-img {
  max-width: 80px;
  height: auto;
}

.report-title {
  color: #007bff;
  font-weight: bold;
  margin: 15px 0;
}

.report-date {
  color: #666;
  font-style: italic;
}

.section-title {
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
  margin-bottom: 15px;
}

.summary-content {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  border-left: 4px solid #007bff;
}

.chart-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
}

.chart-container h4 {
  color: #495057;
  margin-bottom: 15px;
  text-align: center;
}

.chart-wrapper {
  height: 300px;
  margin-bottom: 10px;
}

.chart-explanation {
  font-size: 0.9em;
  color: #666;
  font-style: italic;
  text-align: center;
}

.table-section {
  margin-top: 30px;
}

.table-responsive {
  max-height: 400px;
  overflow-y: auto;
}

.table th {
  background-color: #007bff !important;
  color: white !important;
  position: sticky;
  top: 0;
  z-index: 10;
}

.footer-section {
  border-top: 2px solid #007bff;
  padding-top: 15px;
  color: #666;
  font-size: 0.9em;
}

@media print {
  .wra-report {
    max-width: none;
    margin: 0;
    padding: 15px;
  }

  .chart-wrapper {
    height: 250px;
  }

  .table-responsive {
    max-height: none;
    overflow: visible;
  }
}
</style>