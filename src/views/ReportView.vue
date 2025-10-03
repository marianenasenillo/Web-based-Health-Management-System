<script setup>
import DashboardView from '@/components/DashboardView.vue'
import { ref } from 'vue'

const showReport = ref(false)
const step = ref(1)

const openReport = () => {
  showReport.value = true
  step.value = 1
}
const closeReport = () => showReport.value = false
const nextStep = () => step.value++
const prevStep = () => step.value--
</script>


<template>
  <DashboardView>
    <div class="report-bg d-flex align-items-center position-relative">
      <!-- Overlay Content (left side, not centered) -->
      <div class="overlay-content text-white text-start">
        <h1 class="fw-bold">Health Summary Report</h1>
        <p>Click below to view the Health Summary Report for Barangay 5.</p>
        <button class="btn view-btn mt-3" @click="openReport">View Report</button>
      </div>

      <!-- Modal Overlay for Report -->
      <div v-if="showReport" class="records-overlay">
        <div class="records-box d-flex flex-column align-items-center">
          <button class="back-btn align-self-start" @click="closeReport">← back</button>
          <div class="report-container py-4 bg-white shadow rounded">
            <template v-if="step === 1">
              <!-- FIRST REPORT CONTENT -->
              <!-- HEADER -->
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
                <h4 class="fw-bold">Health Summary Report</h4>
                <p>
                  Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
                  Reporting Period: September 2025
                </p>
              </div>
              <section class="mb-4">
                <h5 class="fw-bold">Executive Summary</h5>
                <p>
                  Barangay 5, with its 4 puroks, demonstrated strong participation in household profiling and preventive
                  health initiatives during September 2025. The barangay achieved one of the highest deworming coverage
                  rates in the municipality (92%), while also showing active participation in women’s health monitoring,
                  cervical cancer screening, and Vitamin A supplementation.
                </p>
              </section>
              <section class="mb-4">
                <h5 class="fw-bold">Key Findings</h5>
                <ol>
                  <li class="mb-3">
                    <strong>Household Profiling & Household Head Profile</strong>
                    <ul>
                      <li>Total Households Profiled: 412</li>
                      <li>Average Household Size: 5.1 members</li>
                      <li>Household Heads by Gender: 70% male, 30% female</li>
                      <li>Primary Livelihoods: 55% farming, 25% small business, 15% wage earners, 5% others</li>
                    </ul>
                  </li>
                  <li class="mb-3">
                    <strong>Deworming Records</strong>
                    <ul>
                      <li>Children Dewormed (Ages 1–14): 328</li>
                      <li>Coverage Rate: 92% (highest in municipality)</li>
                      <li>Purok Participation: All 4 puroks consistently high</li>
                    </ul>
                  </li>
                  <li class="mb-3">
                    <strong>Women of Reproductive Age (WRA) Monitoring</strong>
                    <ul>
                      <li>Monitored Women (15–49 years): 224</li>
                      <li>Pregnant Women Registered: 29 (13%)</li>
                      <li>Family Planning Users: 103 (46%)</li>
                      <li>Adolescent Mothers (&lt;19 years): 5</li>
                    </ul>
                  </li>
                  <li class="mb-3">
                    <strong>Cervical Cancer Screening Records</strong>
                    <ul>
                      <li>Women Screened: 62 (28% of WRA)</li>
                      <li>Positive VIA Results: 2 (3.2%)</li>
                      <li>Referral Compliance: 100%</li>
                    </ul>
                  </li>
                  <li class="mb-3">
                    <strong>Vitamin A Supplementation Records</strong>
                    <ul>
                      <li>Children 6–59 months Supplemented: 115</li>
                      <li>Coverage Rate: 79%</li>
                      <li>Highest Coverage: Purok 3 (85%)</li>
                      <li>Lowest Coverage: Purok 1 (73%)</li>
                    </ul>
                  </li>
                </ol>
              </section>
              <section>
                <h5 class="fw-bold">Conclusion and Recommendations</h5>
                <p>
                  Barangay 5 shows commendable performance in deworming and household profiling, with active engagement
                  across all four puroks. Areas requiring improvement include:
                </p>
                <ul>
                  <li>Expanding cervical cancer screening coverage among women of reproductive age.</li>
                  <li>Increasing Vitamin A supplementation uptake in Purok 1 to meet the 85% target.</li>
                  <li>Strengthening adolescent health education to address early pregnancies.</li>
                </ul>
                <p>
                  With sustained support and active Barangay Health Workers, Barangay 5 has the potential to serve as a
                  model barangay for community-based health programs in Buenavista.
                </p>
              </section>
              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-primary" @click="nextStep">Next &rarr;</button>
              </div>
            </template>
            <template v-else-if="step === 2">
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
                <h4 class="fw-bold">Disease Incidence / Comparative Report</h4>
                <p>
                  Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
                  Reporting Period: September 2025
                </p>
              </div>
              <div class="text-center mb-4">
                <img src="/images/disease-report.jpg" alt="Disease Report" style="max-width: 100%; border-radius: 12px;" />
              </div>
              <section>
                <p>
                  In September 2025, Barangay 5 recorded a total of 174 disease cases across its four puroks. Purok 1 and Purok 3 registered the highest numbers, with 48 and 46 cases, respectively, indicating areas of greater health concern.<br>
                  The disease distribution shows that Acute Respiratory Infections (ARI) accounted for the largest share of cases (30%), followed by Hypertension (21%) and Diarrheal Diseases (13%). Other conditions, including influenza-like illness and skin infections, made up smaller proportions.<br>
                  When compared with August, data reveal an increase in ARI (46 → 52 cases) and Diarrhea (19 → 23 cases), while Hypertension cases remained stable. This suggests a growing burden of respiratory and water-borne diseases that require immediate community health interventions.
                </p>
                <h5 class="fw-bold mt-4">Conclusion</h5>
                <p>
                  Barangay 5 continues to face recurring health issues, particularly respiratory and diarrheal diseases. Strengthened respiratory hygiene campaigns, safe water practices, and targeted barangay-level health monitoring are recommended, with Purok 1 and 3 prioritized for focused interventions.
                </p>
              </section>
              <div class="d-flex justify-content-between mt-4">
                <button class="btn btn-secondary" @click="prevStep">&larr; Back</button>
                <button class="btn btn-primary" @click="nextStep">Next &rarr;</button>
              </div>
            </template>
            <template v-else-if="step === 3">
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
              <div class="text-center mb-4">
                <img src="/images/hdr.jpg" alt="Household Demographic Report" style="max-width: 100%; border-radius: 12px;" />
              </div>
              <section>
                <p>
                  In Barangay 5, there are 768 households across the four puroks. Purok 3 has the highest number of households (200), while Purok 2 has the lowest (185).<br>
                  Most of the population are adults (25–59 years, 42%) and children (0–14 years, 31%), showing that many families have young dependents. Seniors (60+) make up only 9% of the population.<br>
                  When it comes to household heads, majority reached high school (41%) or elementary (34%), while some finished college or vocational courses (22%). Only a small group (3%) had no formal schooling.<br>
                  For livelihood, farming is the main source of income (47%), followed by small business (26%) and wage earners (20%).
                </p>
                <h5 class="fw-bold mt-4">Conclusion</h5>
                <p>
                  Barangay 5 is a family-centered, farming community with many children and working-age adults. Health programs should focus on child nutrition, maternal care, and livelihood support to help improve family well-being.
                </p>
              </section>
              <div class="d-flex justify-content-between mt-4">
                <button class="btn btn-secondary" @click="prevStep">&larr; Back</button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.report-bg {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: url('/images/bg.jpg') no-repeat center center;
  background-size: cover;
  min-height: calc(120vh - 319px);
}
.overlay-content {
  background: rgba(131, 189, 45, 0.65);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 480px;
  margin-left: 6rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}
.view-btn {
  background-color: #ffcc00;
  color: #000;
  font-weight: 600;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  transition: 0.3s;
  width: 100%;
}
.view-btn:hover {
  background-color: #e6b800;
}
.records-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
}
.records-box {
  background: rgba(162, 163, 160, 0.65);
  padding: 3rem 4rem;
  border-radius: 1rem;
  max-width: 1300px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.back-btn {
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  font-weight: bold;
  color: #000;
  font-size: 1.35rem;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.back-btn:hover {
  transform: scale(1.1);
}
.report-container {
  max-width: 1100px;
  padding-left: 3rem;
  padding-right: 3rem;
  max-height: 80vh;      /* NEW: limit height */
  overflow-y: auto;      /* NEW: enable vertical scroll */
}
</style>
