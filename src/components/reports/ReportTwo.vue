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
          <h5 class="text-center mb-3">Population by Purok</h5>
          <canvas ref="CasesbarCanvas"></canvas>
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Overall Gender Distribution</h5>
          <canvas ref="DieseasepieCanvas"></canvas>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Comparative Population per Purok</h5>
           <canvas ref="lineChart"></canvas>
        </div>
      </div>
    </div>
  </div>
              <section class="report-text">
      <h4>Reporting Period: September 2025</h4>

      <p>
        In September 2025, Barangay 5 recorded a total of 810 residents across its five puroks.
        Purok 2 had the highest population with 204 individuals, followed by Purok 3B with 191.
        The smallest cluster was Purok 4A, with 111 residents, reflecting fewer households and
        family groups compared to other areas.
      </p>

      <p>
        The overall gender composition is nearly balanced, with 400 females (50.6%) and
        400 males (49.4%). Purok 3B recorded the highest number of females (102), while
        Purok 2 reported the highest number of males (110).
      </p>

      <p>
        Family and household data also suggest that Purok 2 and 3B maintain denser population
        clusters, averaging around 4–5 individuals per household, indicating higher residential
        concentration in these areas.
      </p>

      <h4>Conclusion</h4>

      <p>
        Barangay 5 demonstrates a stable and well-distributed population across all puroks,
        with only minor variations in density. To ensure equitable access to barangay services,
        it is recommended that community resources, health services, and monitoring programs
        focus on high-density areas such as Purok 2 and 3B, while maintaining adequate support
        for smaller zones like Purok 4A.
      </p>

      <p>
        These findings support future planning and resource allocation aimed at improving
        community management and public health initiatives.
      </p>
    </section>
              <div class="d-flex justify-content-between mt-4">
               <button class="btn btn-secondary" @click="$emit('prev')">&larr; Back</button>
      <button class="btn btn-primary" @click="$emit('next')">Next &rarr;</button>
              </div>
            </template>