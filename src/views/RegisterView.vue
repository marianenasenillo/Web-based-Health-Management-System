<script setup>
import { ref } from 'vue'

// form fields
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const role = ref('')
const barangay = ref('')
const purok = ref('')
const password = ref('')
const confirmPassword = ref('')

// options
const roleOptions = ['BHW', 'Barangay Admin']
const barangayOptions = ['Brgy. 5', 'Brgy. 6']
const purokOptions = ['Purok 1', 'Purok 2', 'Purok 3']

// mock register function
const handleRegister = () => {
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !role.value ||
    !barangay.value ||
    !purok.value ||
    !password.value ||
    !confirmPassword.value
  ) {
    alert('Please fill in all fields.')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  alert(`Registration successful! Welcome, ${firstName.value} ${lastName.value}!`)
}
</script>

<template>
  <v-app class="yellow-background">
    <!-- APP BAR -->
    <v-app-bar app color="#5b841e" height="90" class="d-flex align-center px-4"> </v-app-bar>

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

          <!-- RIGHT SIDE (Register Form Card) -->
          <v-col cols="12" md="4" class="d-flex justify-center">
            <v-card
              class="flex-grow-1 d-flex flex-column justify-center"
              elevation="4"
              color="#fff9c4"
              height="472"
            >
              <!-- Title -->
              <h3
                class="text-center font-weight-bold mt-4"
                style="text-decoration: underline; font-size: 28px; color: #2e4e1f"
              >
                USER REGISTRATION
              </h3>
              <p class="text-center mb-6" style="color: #2e4e1f">
                Create your Buenavista HealthSync account
              </p>

              <!-- Two Column Form Layout -->
              <v-row class="mx-4 d-flex justify-center">
                <!-- Left Column -->
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="firstName"
                    label="First Name"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                  <v-text-field
                    v-model="email"
                    label="Email Address"
                    type="email"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
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
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                </v-col>

                <!-- Right Column -->
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="lastName"
                    label="Last Name"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
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
                  <v-select
                    v-model="purok"
                    label="Purok"
                    :items="purokOptions"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="filled"
                    bg-color="#5b841e"
                    color="white"
                    density="comfortable"
                    class="text-white"
                    style="--v-theme-on-surface: white"
                  />
                </v-col>
              </v-row>

              <!-- Register Button -->
              <div class="mx-16 mb-5">
                <v-btn
                  block
                  class="text-white text-lowercase font-weight-bold"
                  style="background-color: #5b841e"
                  @click="handleRegister"
                >
                  register
                </v-btn>
              </div>

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
