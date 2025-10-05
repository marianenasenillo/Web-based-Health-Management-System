<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const userRole = ref(null)

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    userRole.value = user.user_metadata?.role || null
  } else {
    router.push('/') // redirect to login if not logged in
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
        <v-btn
          v-if="userRole === 'Admin'"
          text
          to="/bhw"
        >
          BHW
        </v-btn>

        <!-- SHARED BUTTONS -->
        <v-btn text to="/reports">Reports</v-btn>
        <v-btn text to="/calendar">Calendar</v-btn>
        <v-btn text to="/inventory">Inventory</v-btn>

        <!-- LOGOUT BUTTON -->
        <v-btn text @click="logout">Log out</v-btn>

        <!-- optional user avatar -->
        <v-avatar size="36" class="ml-3">
          <v-img src="/images/avatar.jpg" alt="user" />
        </v-avatar>
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

