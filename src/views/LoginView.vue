<script setup></script>

<template>
  <v-app class="yellow-background">
    <!-- HEADER -->
    <v-app-bar app color="#5b841e" height="90" class="d-flex align-center"> </v-app-bar>

    <!-- MAIN -->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row class="d-flex justify-center align-center fill-height" >
          <v-col cols="12" md="10">
            <v-card class="pa-8 rounded-xl" elevation="4" color="#fff9c4">
              <v-row >
                <!-- LEFT SIDE (Logo Centered) -->
                <v-col cols="12" md="6" class="d-flex align-center justify-center">
                  <v-img src="/images/logo.png" max-width="500" contain />
                </v-col>

                
                <!-- RIGHT SIDE (Login Form Centered) -->
                <v-col cols="12" md="5" class="d-flex flex-column align-center justify-center">
                  <div style="width: 100%; max-width: 300px">
                    <h3
                      class="text-center font-weight-bold text-decoration-underline"
                      style="font-size: 36px"
                    >
                      USER LOGIN
                    </h3>
                    <p class="text-center mb-6">Welcome to Buenavista HealthSync</p>

                    <v-text-field label="Username:" variant="outlined" color="green" class="mb-3" />

                    <v-text-field
                      label="Password:"
                      type="password"
                      variant="outlined"
                      color="green"
                      class="mb-3"
                    />

                    <v-row>
                      <v-col cols="6">
                        <v-select
                          label="Role"
                          :items="['BHW', 'Barangay Admin']"
                          variant="outlined"
                          color="green"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          label="Assigned Purok"
                          :items="['Purok 1', 'Purok 2', 'Purok 3']"
                          variant="outlined"
                          color="green"
                        />
                      </v-col>
                    </v-row>

                    <v-btn block color="green" class="mt-4 text-white">log in</v-btn>

                    <p class="text-center mt-2">
                      <a href="#">Forgot password?</a>
                    </p>

                    <p class="text-center mt-6">
                      Don’t have an account?
                      <a href="#">Sign up</a>
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer app color="#5b841e" height="80" class="d-flex align-center justify-center">
      <span class="text-white text-decoration-underline">2025 All Rights Reserved</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
.yellow-background {
  background-color: #ffeb3b;
}
</style>
