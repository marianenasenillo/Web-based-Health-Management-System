<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const emit = defineEmits(['prev', 'next'])

const stats = ref({
  totalCases: 0,
  purokCases: {
    'Purok 1': 0,
    'Purok 2': 0,
    'Purok 3': 0,
    'Purok 4': 0
  },
  diseases: {}
})

const casesBarData = ref({
  labels: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4'],
  datasets: [{
    label: 'Number of Cases',
    data: [0, 0, 0, 0],
    backgroundColor: '#36A2EB'
  }]
})

const diseasePieData = ref({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const fetchDiseaseStats = async () => {
  try {
    const { data: dewormingData } = await supabase
      .from('deworming_records')
      .select('purok')
      
    if (dewormingData) {
      // Count cases by purok
      dewormingData.forEach(record => {
        if (record.purok in stats.value.purokCases) {
          stats.value.purokCases[record.purok]++
        }
      })
      
      // Update bar chart data
      casesBarData.value.datasets[0].data = Object.values(stats.value.purokCases)
      stats.value.totalCases = dewormingData.length

      // Calculate disease distribution (using sex as proxy for diseases in this example)
      const diseaseCount = {}
      dewormingData.forEach(record => {
        const type = record.sex === 'M' ? 'Male Cases' : 'Female Cases'
        diseaseCount[type] = (diseaseCount[type] || 0) + 1
      })

      // Update pie chart data
      diseasePieData.value.labels = Object.keys(diseaseCount)
      diseasePieData.value.datasets[0].data = Object.values(diseaseCount)
      stats.value.diseases = diseaseCount
    }
  } catch (error) {
    console.error('Error fetching disease stats:', error)
  }
}

onMounted(() => {
  fetchDiseaseStats()
})
</script>

<template>
              <!-- SECOND REPORT CONTENT -->
              <div class="mb-4">
                <div class="row align-items-center">
                  <div class="col-3 text-end">
                    <img src="/images/agusanlogo.png" alt="Province Logo" height="80" />
                  </div>
                  <div class="col-6 text-center">
                    <h5 class="fw-bold mb-1">Republic of the Philippines</h5>
                    <h6 class="mb-0">
                      Province of Agusan del Norte <br />
                      Municipality of Buenavista <br />
                      <strong>Barangay Poblacion</strong>
                    </h6>
                  </div>
                  <div class="col-3 text-start">
                    <img src="/images/barangaylogo.png" alt="Barangay Logo" height="80" />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="text-center mb-4">
                <h4 class="fw-bold">Disease Incidence / Comparative Report</h4>
                <p>
                  Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
                  Reporting Period: September 2025
                </p>
              </div>
              <div class="container py-4">
    <div class="row">
      <!-- Bar Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Cases by Purok</h5>
          <canvas ref="CasesbarCanvas"></canvas>
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Disease Distribution</h5>
          <canvas ref="DieseasepieCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
              <section>
                <p>
                  In September 2025, Barangay 5 recorded a total of {{ stats.totalCases }} disease cases across its four puroks. 
                  {{ 
                    Object.entries(stats.purokCases)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 2)
                      .map(([purok, cases]) => `${purok} (${cases} cases)`)
                      .join(' and ')
                  }} registered the highest numbers, indicating areas of greater health concern.<br>
                  The case distribution shows that: 
                  {{ 
                    Object.entries(stats.diseases)
                      .map(([type, count]) => `${type} accounts for ${Math.round((count/stats.totalCases)*100)}% (${count} cases)`)
                      .join(', ')
                  }}.<br>
                </p>
                
              </section>
              <div class="d-flex justify-content-between mt-4">
               <button class="btn btn-secondary" @click="$emit('prev')">&larr; Back</button>
      <button class="btn btn-primary" @click="$emit('next')">Next &rarr;</button>
              </div>
            </template>