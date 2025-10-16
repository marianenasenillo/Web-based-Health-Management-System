<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DashboardView from '@/components/DashboardView.vue'
import { supabase } from '@/utils/supabase'

const router = useRouter()

// state
const bhwList = ref([])
const selectedBhw = ref(null)

// ✅ Fetch BHW users from Supabase Edge Function
onMounted(async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    const response = await fetch(
      'https://hzmhjjvobhugsebwbwqn.supabase.co/functions/v1/get-bhw-users',
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      }
    )

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const users = await response.json()
    console.log('Fetched users:', JSON.stringify(users, null, 2)) // 👀 see structure

    // ✅ use user_metadata (same as your profile fetch)
    bhwList.value = users.map(u => ({
  id: u.id,
  name: u.name || 'Unnamed',
  birthdate: u.birthdate || 'N/A',
  contact: u.contact || 'N/A',
  purok: u.purok || 'N/A',
  schedule: u.schedule || 'N/A',
  photo: u.photo || '/images/default-avatar.png',
  role: u.role || 'N/A'
}))



    if (bhwList.value.length > 0) {
      selectedBhw.value = bhwList.value[0]
    }

  } catch (err) {
    console.error('Error fetching BHW users:', err.message)
  }
})

// select bhw
function selectBhw(bhw) {
  selectedBhw.value = bhw
}

// navigate to register
function goToRegister() {
  router.push('/register')
}
</script>



<template>
  <DashboardView>
    <div class="home-bg d-flex" style="height: 100%; background-color: #5e7d2b;">
      <!-- LEFT PANEL -->
      <div class="flex-grow-1 p-3 d-flex justify-content-center align-items-center">
        <div
          v-if="selectedBhw"
          class="bg-white bg-opacity-75 p-4 rounded shadow"
          style="width: 350px;"
        >
          <div class="text-center mb-3">
            <img
              :src="selectedBhw.photo"
              alt="Profile photo"
              class="img-thumbnail mb-2"
              style="width: 150px; height: 180px; object-fit: cover;"
            />
          </div>
          <p><b>Full name:</b> {{ selectedBhw.name }}</p>
          <p><b>Birthdate:</b> {{ selectedBhw.birthdate }}</p>
          <p><b>Contact number:</b> {{ selectedBhw.contact }}</p>
          <p><b>Assigned Purok:</b> {{ selectedBhw.purok }}</p>
          <p><b>Duty Schedule:</b> {{ selectedBhw.schedule }}</p>
          <p><b>Role:</b> {{ selectedBhw.role }}</p>
        </div>

        <div v-else class="text-white text-center p-4">
          <p>Loading BHW data...</p>
        </div>
      </div>

      <!-- RIGHT PANEL -->
      <div
        class="bg-white bg-opacity-75 p-3 rounded-start overflow-auto"
        style="width: 350px; position: relative;"
      >
        <div class="d-flex flex-column gap-2 mb-5">
          <button
            v-for="bhw in bhwList"
            :key="bhw.id"
            class="btn btn-light border text-start"
            @click="selectBhw(bhw)"
          >
            {{ bhw.name }}
          </button>
        </div>
        <button
          class="btn btn-light border rounded-circle position-absolute bottom-0 end-0 mb-3 me-3"
          style="width: 50px; height: 50px; font-size: 24px;"
          @click="goToRegister"
        >
          +
        </button>
      </div>
    </div>

  </DashboardView>
</template>

<style scoped>
.home-bg {
  background: url('/images/bg.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
  width: 100%;
}
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}
</style>
