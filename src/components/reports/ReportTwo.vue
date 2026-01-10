<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController, BarController } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PieController, BarController)

const emit = defineEmits(['prev', 'next'])

const barangayBarCanvas = ref(null)
const genderPieCanvas = ref(null)
const purokBarCanvas = ref(null)

const barangayChartData = ref({})
const genderChartData = ref({})
const purokChartData = ref({})

onMounted(async () => {
  await fetchBarangayComparison()
  await fetchGenderDistribution()
  await fetchPurokComparison()

  // Create charts
  if (barangayBarCanvas.value) {
    new ChartJS(barangayBarCanvas.value, {
      type: 'bar',
      data: barangayChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Comparative Population: Barangay 5 vs Barangay 6' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }

  if (genderPieCanvas.value) {
    new ChartJS(genderPieCanvas.value, {
      type: 'pie',
      data: genderChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Overall Gender Distribution' }
        }
      }
    })
  }

  if (purokBarCanvas.value) {
    new ChartJS(purokBarCanvas.value, {
      type: 'bar',
      data: purokChartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Comparative Population per Purok' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    })
  }
})

const fetchBarangayComparison = async () => {
  try {
    const { data, error } = await supabase
      .from('household_heads')
      .select('barangay, population')
      .in('barangay', ['Barangay 5', 'Barangay 6'])
      .not('population', 'is', null)

    if (error) throw error

    const barangayData = { 'Barangay 5': 0, 'Barangay 6': 0 }
    data.forEach(item => {
      barangayData[item.barangay] += item.population
    })

    barangayChartData.value = {
      labels: ['Barangay 5', 'Barangay 6'],
      datasets: [{
        label: 'Population',
        data: [barangayData['Barangay 5'], barangayData['Barangay 6']],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1
      }]
    }
  } catch (err) {
    console.error('Error fetching barangay comparison:', err)
  }
}

const fetchGenderDistribution = async () => {
  try {
    const { data, error } = await supabase
      .from('household_members')
      .select('sex')
      .in('barangay', ['Barangay 5', 'Barangay 6'])
      .not('sex', 'is', null)

    if (error) throw error

    const genderCount = { Male: 0, Female: 0 }
    data.forEach(item => {
      if (genderCount[item.sex] !== undefined) {
        genderCount[item.sex]++
      }
    })

    genderChartData.value = {
      labels: Object.keys(genderCount),
      datasets: [{
        label: 'Gender Distribution',
        data: Object.values(genderCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    }
  } catch (err) {
    console.error('Error fetching gender distribution:', err)
  }
}

const fetchPurokComparison = async () => {
  try {
    const { data, error } = await supabase
      .from('household_heads')
      .select('barangay, purok, population')
      .in('barangay', ['Barangay 5', 'Barangay 6'])
      .not('population', 'is', null)

    if (error) throw error

    const purokData = {}
    data.forEach(item => {
      const key = `${item.barangay} - ${item.purok}`
      if (!purokData[key]) purokData[key] = 0
      purokData[key] += item.population
    })

    purokChartData.value = {
      labels: Object.keys(purokData),
      datasets: [{
        label: 'Population',
        data: Object.values(purokData),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }]
    }
  } catch (err) {
    console.error('Error fetching purok comparison:', err)
  }
}
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
                <h4 class="fw-bold">Comparative Report</h4>
                <p>
                  Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
                  Reporting Period: September 2025
                </p>
              </div>
              <div class="container py-4">
    <div class="row">
      <!-- Barangay Comparison Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Comparative Population: Barangay 5 vs Barangay 6</h5>
          <canvas ref="barangayBarCanvas"></canvas>
        </div>
      </div>

      <!-- Gender Pie Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Overall Gender Distribution</h5>
          <canvas ref="genderPieCanvas"></canvas>
        </div>
      </div>

      <!-- Purok Comparison Chart -->
      <div class="col-md-12 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Comparative Population per Purok</h5>
          <canvas ref="purokBarCanvas"></canvas>
        </div>
      </div>
    </div>
  </div>
              
              <div class="d-flex justify-content-between mt-4">
               <button class="btn btn-secondary" @click="$emit('prev')">&larr; Back</button>
      <button class="btn btn-primary" @click="$emit('next')">Next &rarr;</button>
              </div>
            </template>

<style scoped>
canvas {
  height: 300px !important;
  width: 100% !important;
}
</style>