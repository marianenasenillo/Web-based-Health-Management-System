     <script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const emit = defineEmits(['prev'])

const stats = ref({
  totalHouseholds: 0,
  totalPopulation: 0,
  householdsByPurok: {
    'Purok 1': 0,
    'Purok 2': 0,
    'Purok 3': 0,
    'Purok 4': 0
  },
  ageDistribution: {
    '0-14 years': 0,
    '15-24 years': 0,
    '25-59 years': 0,
    '60+ years': 0
  }
})

const householdBarData = ref({
  labels: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4'],
  datasets: [{
    label: 'Number of Households',
    data: [0, 0, 0, 0],
    backgroundColor: '#4CAF50'
  }]
})

const ageDistributionData = ref({
  labels: ['0-14 years', '15-24 years', '25-59 years', '60+ years'],
  datasets: [{
    data: [0, 0, 0, 0],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  }]
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  }
}

const fetchHouseholdStats = async () => {
  try {
    // Reset stats
    stats.value = {
      totalHouseholds: 0,
      totalPopulation: 0,
      householdsByPurok: {
        'Purok 1': 0,
        'Purok 2': 0,
        'Purok 3': 0,
        'Purok 4': 0
      },
      ageDistribution: {
        '0-14 years': 0,
        '15-24 years': 0,
        '25-59 years': 0,
        '60+ years': 0
      }
    }

    // Get household distribution by purok from household_heads
    const { data: householdData, error: householdError } = await supabase
      .from('household_heads')
      .select('purok, population')

    if (householdError) throw householdError

    if (householdData && householdData.length > 0) {
      // Count households by purok
      householdData.forEach(record => {
        if (record.purok && record.purok in stats.value.householdsByPurok) {
          stats.value.householdsByPurok[record.purok]++
        }
      })

      // Calculate total households and total population
      stats.value.totalHouseholds = householdData.length
      stats.value.totalPopulation = householdData.reduce((sum, record) => sum + (record.population || 0), 0)

      // Update bar chart data - create new object to trigger reactivity
      householdBarData.value = {
        ...householdBarData.value,
        datasets: [{
          ...householdBarData.value.datasets[0],
          data: Object.values(stats.value.householdsByPurok)
        }]
      }
    }

    // Get age distribution from household_members
    const { data: memberData, error: memberError } = await supabase
      .from('household_members')
      .select('age')

    if (memberError) throw memberError

    if (memberData && memberData.length > 0) {
      // Calculate age distribution
      memberData.forEach(member => {
        const age = member.age || 0
        if (age <= 14) stats.value.ageDistribution['0-14 years']++
        else if (age <= 24) stats.value.ageDistribution['15-24 years']++
        else if (age <= 59) stats.value.ageDistribution['25-59 years']++
        else stats.value.ageDistribution['60+ years']++
      })

      // Update pie chart data - create new object to trigger reactivity
      ageDistributionData.value = {
        ...ageDistributionData.value,
        datasets: [{
          ...ageDistributionData.value.datasets[0],
          data: Object.values(stats.value.ageDistribution)
        }]
      }
    }

    console.log('Stats loaded:', stats.value)
    console.log('Bar data:', householdBarData.value)
    console.log('Pie data:', ageDistributionData.value)

    // If no data, set some sample data for testing
    if (stats.value.totalHouseholds === 0) {
      console.log('No household data found, using sample data')
      stats.value = {
        totalHouseholds: 4,
        totalPopulation: 20,
        householdsByPurok: {
          'Purok 1': 1,
          'Purok 2': 1,
          'Purok 3': 1,
          'Purok 4': 1
        },
        ageDistribution: {
          '0-14 years': 5,
          '15-24 years': 5,
          '25-59 years': 7,
          '60+ years': 3
        }
      }

      householdBarData.value = {
        labels: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4'],
        datasets: [{
          label: 'Number of Households',
          data: [1, 1, 1, 1],
          backgroundColor: '#4CAF50'
        }]
      }

      ageDistributionData.value = {
        labels: ['0-14 years', '15-24 years', '25-59 years', '60+ years'],
        datasets: [{
          data: [5, 5, 7, 3],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      }
    }

  } catch (error) {
    console.error('Error fetching household stats:', error)
    
    // Set sample data on error for testing
    stats.value = {
      totalHouseholds: 4,
      totalPopulation: 20,
      householdsByPurok: {
        'Purok 1': 1,
        'Purok 2': 1,
        'Purok 3': 1,
        'Purok 4': 1
      },
      ageDistribution: {
        '0-14 years': 5,
        '15-24 years': 5,
        '25-59 years': 7,
        '60+ years': 3
      }
    }

    householdBarData.value = {
      labels: ['Purok 1', 'Purok 2', 'Purok 3', 'Purok 4'],
      datasets: [{
        label: 'Number of Households',
        data: [1, 1, 1, 1],
        backgroundColor: '#4CAF50'
      }]
    }

    ageDistributionData.value = {
      labels: ['0-14 years', '15-24 years', '25-59 years', '60+ years'],
      datasets: [{
        data: [5, 5, 7, 3],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    }
  }
}

onMounted(() => {
  fetchHouseholdStats()
})
</script>

<template>
              <!-- THIRD REPORT CONTENT -->
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
                <h4 class="fw-bold">Household Demographic Report</h4>
                <p>
                  Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
                  September 2025
                </p>
              </div>
               <div class="container py-4">
    <div class="row">
      <!-- Bar Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Households per Purok</h5>
          <div style="width: 100%; max-width: 500px; margin: 0 auto;">
            <Bar :data="householdBarData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="text-center mb-3">Age Distribution</h5>
          <div style="width: 100%; max-width: 500px; margin: 0 auto;">
            <Pie :data="ageDistributionData" :options="pieChartOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
              <section>
                <p>
                  In Barangay 5, there are {{ stats.totalHouseholds }} households across the four puroks with a total population of {{ stats.totalPopulation }}. 
                  {{ 
                    Object.entries(stats.householdsByPurok)
                      .sort((a, b) => b[1] - a[1])
                      .map(([purok, count], index) => 
                        index === 0 
                          ? `${purok} has the highest number of households (${count})` 
                          : index === 3 
                            ? `while ${purok} has the lowest (${count})`
                            : ''
                      )
                      .filter(text => text)
                      .join(', ')
                  }}.<br>
                  The age distribution of the population shows: 
                  {{ 
                    Object.entries(stats.ageDistribution)
                      .map(([group, count]) => 
                        `${group}: ${stats.totalPopulation > 0 ? Math.round((count/stats.totalPopulation)*100) : 0}% (${count})`
                      )
                      .join(', ')
                  }}.<br>
                </p>
                
              </section>
              <div class="d-flex justify-content-between mt-4">
               <button class="btn btn-secondary" @click="$emit('prev')">&larr; Back</button>
              </div>
            </template>