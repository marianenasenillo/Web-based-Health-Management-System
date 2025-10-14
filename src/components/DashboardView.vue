<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const router = useRouter()
const userRole = ref(null)
const userData = ref({})
const showUserMenu = ref(false)
const mobileDrawer = ref(false)

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
        <router-link to="/" class="logo-link">
          <img src="/images/logo.png" alt="logo" class="header-logo" />
        </router-link>

        <v-spacer></v-spacer>

        <!-- Mobile hamburger (shows on <=1024px) -->
        <v-btn icon class="mobile-only" aria-label="Open navigation drawer" @click="mobileDrawer = true" color="white">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <!-- COMMON BUTTONS -->
        <v-btn class="desktop-only" text to="/home">Home</v-btn>

        <!-- ADMIN-ONLY BUTTON -->
        <v-btn class="desktop-only" v-if="userRole === 'Admin'" text to="/bhw">BHW</v-btn>
        <v-btn class="desktop-only" v-if="userRole === 'Admin'" text to="/reports">Reports</v-btn>
        <!-- SHARED BUTTONS -->
        
        <v-btn class="desktop-only" text to="/calendar">Calendar</v-btn>
        <v-btn class="desktop-only" text to="/inventory">Inventory</v-btn>

        <!-- LOGOUT BUTTON -->
        <v-btn class="desktop-only" text @click="logout">Log out</v-btn>

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

      <!-- Mobile Navigation Drawer -->
      <v-navigation-drawer
        v-model="mobileDrawer"
        temporary
        right
        class="mobile-drawer"
        elevation="6"
      >
        <v-list dense>
          <v-list-item to="/home" @click="mobileDrawer = false"><v-list-item-title>Home</v-list-item-title></v-list-item>
          <v-list-item v-if="userRole === 'Admin'" to="/bhw" @click="mobileDrawer = false"><v-list-item-title>BHW</v-list-item-title></v-list-item>
          <v-list-item v-if="userRole === 'Admin'" to="/reports" @click="mobileDrawer = false"><v-list-item-title>Reports</v-list-item-title></v-list-item>
          <v-list-item to="/calendar" @click="mobileDrawer = false"><v-list-item-title>Calendar</v-list-item-title></v-list-item>
          <v-list-item to="/inventory" @click="mobileDrawer = false"><v-list-item-title>Inventory</v-list-item-title></v-list-item>
          <v-list-item @click="() => { mobileDrawer = false; logout(); }"><v-list-item-title>Log out</v-list-item-title></v-list-item>
        </v-list>
      </v-navigation-drawer>

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

.logo-link { display: inline-block; }

.header-logo {
  height: 70px;
  display: block;
}

@media (max-width: 1024px) {
  .header-logo { height: 48px; }
}

@media (max-width: 767px) {
  .header-logo { height: 56px; }
}

@media (max-width: 1024px) {

  /* Footer */
  .v-footer {
    height: 110px !important;
    padding: 1rem !important;
  }

  .v-footer span {
    font-size: 1rem !important;
  }
}

/* Desktop / Mobile visibility helpers */
.desktop-only { display: inline-flex; }
.mobile-only { display: none; }

@media (max-width: 1280px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: inline-flex !important; }

  /* Enlarge app bar on tablet/phone for easier tapping */
  .v-app-bar {
    height: 110px !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  /* Ensure header logo remains visible and centered-ish on small screens */
  .logo-link { margin-left: 0; }
}

/* Style the mobile drawer content so it's dark with white text */
::v-deep .mobile-drawer .v-list,
::v-deep .mobile-drawer {
  background: #5b841e !important;
  color: #ffffff !important;
}

::v-deep .mobile-drawer .v-list-item-title,
::v-deep .mobile-drawer .v-list-item {
  color: #ffffff !important;
}

/* Shift logo to the right on larger screens */
@media (min-width: 1025px) {
  .logo-link { margin-left: 10%; }
}

/* Reset margin on medium/smaller screens */
@media (max-width: 1024px) {
  .logo-link { margin-left: 0; }
}

@media (max-width: 767px) {
  .v-footer {
    height: 95px !important;
  }

  .v-footer span {
    font-size: 1.05rem !important;
  }
}
</style>
