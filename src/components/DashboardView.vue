<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  // sample logout action
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

        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/reports">Reports</v-btn>
        <v-btn text to="/calendar">Calendar</v-btn>
        <v-btn text to="/inventory">Inventory</v-btn>
        <v-btn text @click="logout">Log out</v-btn>
        <v-avatar></v-avatar>

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
      <v-footer app color="#5b841e" height="90" class="d-flex align-center justify-center">
      <span class="text-white text-decoration-underline">2025 All Rights Reserved</span>
    </v-footer>

    </v-app>
  </v-responsive>
</template>
