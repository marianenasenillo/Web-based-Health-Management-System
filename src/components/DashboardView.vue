<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const userRole = ref(null)
const userData = ref({})
const showUserMenu = ref(false)

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    userRole.value = user.user_metadata?.role || null
    userData.value = {
      full_name: user.user_metadata?.full_name || 'No name provided',
      email: user.email,
      role: user.user_metadata?.role || 'Unknown',
      barangay: user.user_metadata?.barangay || 'N/A',
      purok: user.user_metadata?.purok || 'N/A',
      avatar_url: user.user_metadata?.avatar_url || '/images/avatar.jpg',
    }
  } else {
    router.push('/')
  }
})

async function logout() {
  await supabase.auth.signOut()
  router.push('/')
}
</script>

<template>
  <v-responsive>
    <v-app>
      <!-- TOP NAVIGATION -->
      <v-app-bar app color="#5b841e" height="90" class="d-flex align-center px-4">
        <v-img src="/images/logo.png" contain />

        <v-spacer></v-spacer>

        <!-- COMMON BUTTONS -->
        <v-btn text to="/home">Home</v-btn>

        <!-- ADMIN-ONLY BUTTON -->
        <v-btn v-if="userRole === 'Admin'" text to="/bhw">BHW</v-btn>

        <!-- SHARED BUTTONS -->
        <v-btn text to="/reports">Reports</v-btn>
        <v-btn text to="/calendar">Calendar</v-btn>
        <v-btn text to="/inventory">Inventory</v-btn>

        <!-- LOGOUT BUTTON -->
        <v-btn text @click="logout">Log out</v-btn>

        <!-- USER AVATAR (clickable) -->
        <v-menu
          v-model="showUserMenu"
          offset-y
          transition="scale-transition"
          min-width="320"
        >
          <template #activator="{ props }">
            <v-avatar
              v-bind="props"
              size="40"
              class="ml-3 cursor-pointer"
              style="border: 2px solid white;"
            >
              <v-img :src="userData.avatar_url" alt="User avatar" />
            </v-avatar>
          </template>

          <!-- ENLARGED USER INFO CARD -->
          <v-card
            elevation="8"
            color="#fff9c56"
            class="pa-5"
            style="width: 350px; border-radius: 16px;"
          >
            <v-card-text class="text-center">
              <v-avatar size="100" class="mb-4" style="border: 3px solid #5b841e;">
                <v-img :src="userData.avatar_url" />
              </v-avatar>

              <div class="font-weight-bold mb-1" style="font-size: 18px; color: #2e4e1f;">
                {{ userData.full_name }}
              </div>
              <div style="color: #2e4e1f; font-size: 15px;">
                {{ userData.role }}
              </div>

              <v-divider class="my-4"></v-divider>

              <div class="text-left mx-4" style="color: #2e4e1f; font-size: 15px;">
                <p><strong>Email:</strong> {{ userData.email }}</p>
                <p><strong>Barangay:</strong> {{ userData.barangay }}</p>
                <p><strong>Purok:</strong> {{ userData.purok }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-app-bar>

      <!-- MAIN CONTENT -->
      <v-main>
        <slot />
      </v-main>

      <!-- FOOTER -->
      <v-footer
        app
        color="#5b841e"
        height="90"
        class="d-flex align-center justify-center"
      >
        <span class="text-white text-decoration-underline">
          2025 All Rights Reserved
        </span>
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
