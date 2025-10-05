<script setup>
import { ref } from 'vue'

// form fields
const username = ref('')
const password = ref('')
const role = ref('')
const purok = ref('')
const barangay = ref('')

// options
const roleOptions = ['BHW', 'Barangay Admin']
const purokOptions = ['Purok 1', 'Purok 2', 'Purok 3']
const barangayOptions = ['Brgy. 5', 'Brgy. 6']

// mock login function
const handleLogin = () => {
  if (!username.value || !password.value || !role.value || !purok.value || !barangay.value) {
    alert('Please fill in all fields.')
    return
  }

  // example login logic
  console.log('Logging in with:')
  console.log({
    username: username.value,
    password: password.value,
    role: role.value,
    purok: purok.value,
    barangay: barangay.value
  })

  alert(`Welcome, ${username.value}!`)
}
</script>

<template>
  <v-app class="yellow-background">
    <!-- APP BAR -->
    <v-app-bar app color="#5b841e" height="90" class="d-flex align-center px-4">
    </v-app-bar>

    <!-- MAIN CONTENT -->
    <v-main class="main-no-scroll">
      <v-container fluid>
        <v-row class="fill-height d-flex align-center justify-center">
          <!-- LEFT SIDE (Logo Card) -->
          <v-col cols="12" md="7" class="hide-on-mobile">
            <v-card
              class="pa-7 flex-grow-1 d-flex align-center justify-center"
              height="472"
              elevation="4"
              color="#fff9c4"
            >
              <v-img src="/images/logo.png" contain max-width="700" />
            </v-card>
          </v-col>

          <!-- RIGHT SIDE (Login Form Card) -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-card
              class="flex-grow-1 d-flex flex-column justify-center"
              elevation="4"
              color="#fff9c4"
              height="472"
            >
              <!-- Title -->
              <h3
                class="text-center font-weight-bold mt-6"
                style="text-decoration: underline; font-size: 28px; color: #2e4e1f"
              >
                USER LOGIN
              </h3>
              <p class="text-center mb-6" style="color: #2e4e1f">
                Welcome to Buenavista HealthSync
              </p>

              <!-- Username -->
              <v-text-field
                v-model="username"
                label="Username:"
                variant="filled"
                bg-color="#5b841e"
                color="white"
                density="comfortable"
                class="mx-12 text-white"
                style="--v-theme-on-surface: white"
              />

              <!-- Password -->
              <v-text-field
                v-model="password"
                label="Password:"
                type="password"
                variant="filled"
                bg-color="#5b841e"
                color="white"
                density="comfortable"
                class="mx-12 text-white"
                style="--v-theme-on-surface: white"
              />

              <!-- Select fields -->
              <v-row class="mx-9">
                <v-col cols="4">
                  <v-select
                    v-model="role"
                    label="Role"
                    :items="roleOptions"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                </v-col>

                <v-col cols="4">
                  <v-select
                    v-model="purok"
                    label="Assigned Purok"
                    :items="purokOptions"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                </v-col>

                <v-col cols="4">
                  <v-select
                    v-model="barangay"
                    label="Barangay"
                    :items="barangayOptions"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                </v-col>
              </v-row>

              <!-- Login Button -->
              <div class="mx-16">
                <v-btn
                  block
                  class="text-white text-lowercase font-weight-bold"
                  style="background-color: #5b841e"
                  @click="handleLogin"
                >
                  log in
                </v-btn>
              </div>

              <!-- Forgot Password -->
              <p class="text-center mt-2">
                <a href="#" style="color: black; text-decoration: underline">Forgot password?</a>
              </p>

              <!-- Separator line -->
              <div class="my-4 mx-8" style="border-bottom: 1px solid #000"></div>

              <!-- Sign up -->
              <p class="text-center mb-6">
                Don’t have an account?
                <a href="#" style="color: blue; text-decoration: underline">Sign up</a>
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer app color="#5b841e" height="90" class="d-flex align-center justify-center">
      <span class="text-white text-decoration-underline">2025 All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.yellow-background {
  background-color: #ffeb3b;
  min-height: 100vh;
}

.main-no-scroll {
  min-height: calc(100vh - 90px - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (max-width: 1264px) {
  .hide-on-mobile {
    display: none !important;
  }
}
</style>
