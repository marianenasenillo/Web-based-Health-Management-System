<script setup>
import DashboardView from '@/components/DashboardView.vue'
import WraExport from '@/components/reports/WraExport.vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase.js'

const router = useRouter()
const goBack = () => router.back()

const loading = ref(true)
const error = ref(null)
const wraRecords = ref([])
const searchQuery = ref('')

const userRole = ref('')
const selectedPurok = ref('')
const editRecord = ref(null)
const showEditModal = ref(false)
const showReportModal = ref(false)
const reportRef = ref(null)

onMounted(async () => {
  await fetchWraRecords()
})

const filteredRecords = computed(() => {
  let records = wraRecords.value
  const q = String(searchQuery.value || '').trim()
  if (q) {
    records = records.filter(r =>
      String(r.lastname).toLowerCase().includes(q.toLowerCase()) ||
      String(r.firstname).toLowerCase().includes(q.toLowerCase())
    )
  }
  if (selectedPurok.value) {
    records = records.filter(r => r.purok === selectedPurok.value)
  }
  return records
})

const handleSearch = () => {
  // computed `filteredRecords` will react to `searchQuery`; keep placeholder for possible analytics or focus behavior
  // we can also scroll table to top when searching
  const el = document.querySelector('.table-responsive.large-table')
  if (el) el.scrollTop = 0
}

const fetchWraRecords = async () => {
  loading.value = true
  error.value = null
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!user) throw new Error('Not authenticated')

    const userBarangay = user.user_metadata?.barangay
    const userRoleValue = user.user_metadata?.role || 'BHW' // Default to BHW if no role specified
    userRole.value = userRoleValue

    if (!userBarangay) throw new Error('No barangay assigned')

    const { data, error: err } = await supabase
      .from('wra_records')
      .select('*')
      .eq('is_archived', false)
      .order('created_at', { ascending: false })

    if (err) throw err
    wraRecords.value = data.map(record => ({
      id: record.id,
      purok: record.purok,
      lastname: record.lastname,
      firstname: record.firstname,
      middlename: record.middlename,
      suffix: record.suffix,
      age: record.age,
      birthdate: record.birthdate,
      seStatus: record.se_status,
      civilStatus: record.civil_status,
      planoManganak: record.plano_manganak,
      karun: record.karun,
      spacing: record.spacing,
      limiting: record.limiting,
      fecund: record.fecund,
      infecund: record.infecund,
      fbMethod: record.fb_method,
      fbType: record.fb_type,
      fbDate: record.fb_date,
      changeMethod: record.change_method
    }))
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load WRA records.'
  } finally {
    loading.value = false
  }
}

// Delete Record
const deleteRecord = async (record) => {
  if (!confirm(`Are you sure you want to delete the WRA record for "${record.firstname} ${record.lastname}"? This action cannot be undone.`)) {
    return
  }

  try {
    const { error } = await supabase
      .from('wra_records')
      .delete()
      .eq('id', record.id)

    if (error) throw error

    alert('Record deleted successfully.')
    await fetchWraRecords() // Refresh the list
  } catch (e) {
    console.error(e)
    alert('Error deleting record.')
  }
}

// Edit Record
const editRecordFunc = (record) => {
  editRecord.value = { ...record }
  showEditModal.value = true
}

const saveEdit = async () => {
  try {
    const { error } = await supabase
      .from('wra_records')
      .update({
        purok: editRecord.value.purok,
        lastname: editRecord.value.lastname,
        firstname: editRecord.value.firstname,
        middlename: editRecord.value.middlename,
        suffix: editRecord.value.suffix,
        age: editRecord.value.age,
        birthdate: editRecord.value.birthdate,
        se_status: editRecord.value.seStatus,
        civil_status: editRecord.value.civilStatus,
        plano_manganak: editRecord.value.planoManganak,
        karun: editRecord.value.karun,
        spacing: editRecord.value.spacing,
        limiting: editRecord.value.limiting,
        fecund: editRecord.value.fecund,
        infecund: editRecord.value.infecund,
        fb_method: editRecord.value.fbMethod,
        fb_type: editRecord.value.fbType,
        fb_date: editRecord.value.fbDate,
        change_method: editRecord.value.changeMethod
      })
      .eq('id', editRecord.value.id)

    if (error) throw error

    alert('Record updated successfully.')
    showEditModal.value = false
    await fetchWraRecords()
  } catch (e) {
    console.error(e)
    alert('Error updating record.')
  }
}

// Archive Record
const archiveRecord = async (record) => {
  if (!confirm(`Are you sure you want to archive the WRA record for "${record.firstname} ${record.lastname}"?`)) {
    return
  }

  try {
    const { error } = await supabase
      .from('wra_records')
      .update({
        is_archived: true,
        archived_at: new Date().toISOString()
      })
      .eq('id', record.id)

    if (error) throw error

    alert('Record archived successfully.')
    await fetchWraRecords() // Refresh the list
  } catch (e) {
    console.error(e)
    alert('Error archiving record.')
  }
}

// Export PDF function
const exportPdf = async () => {
  if (!reportRef.value) {
    alert('Report content not available.')
    return
  }

  try {
    const el = reportRef.value
    if (!el) {
      alert('Report content not available.')
      return
    }

    // wait a moment so charts / dynamic content can finish rendering
    await new Promise(resolve => setTimeout(resolve, 300))

    const canvas = await html2canvas(reportRef.value, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff'
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4') // A4 size

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    pdf.save('wra_report.pdf')
  } catch (err) {
    console.error('Error generating PDF:', err)
    alert('Error generating PDF. Please try again.')
  }
}
</script>


<template>
  <DashboardView>
    <div class="maternal-bg">
      <div class="container">
        <div class="records-top d-flex align-items-center mb-2">
          <button class="btn btn-outline-secondary me-3" @click="goBack">← Back</button>
          <h3 class="mb-0">Women of Reproductive Age Records</h3>
          <div class="ms-auto search-box">
            <div class="input-group">
              <button class="btn btn-primary report-btn" @click="showReportModal = true">Export Overall Report</button>
              <input v-model="searchQuery" @keyup.enter="handleSearch" type="search" class="form-control search-input" placeholder="Search by Last Name or First Name..." aria-label="Search by Last Name or First Name">
              <button class="btn btn-primary search-btn" @click="handleSearch">Search</button>
              <button class="btn btn-outline-secondary ms-2" v-if="searchQuery" @click="searchQuery = ''">Clear</button>
              <button v-if="userRole === 'Admin'" class="btn btn-warning report-btn" @click="router.push('/wraarchived')">Archived</button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status"></div>
          <p>Loading records...</p>
        </div>

        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <div v-else>
          <div class="table-wrapper">
            <div class="table-responsive large-table">
              <table class="table table-bordered table-striped mb-0">
                <thead class="table-light">
                  <tr>
                    <th><select v-model="selectedPurok" class="form-select me-2" style="max-width: 150px;">
                <option value="">Purok</option>
                <option value="Purok 1">Purok 1</option>
                <option value="Purok 2">Purok 2</option>
                <option value="Purok 3">Purok 3</option>
                <option value="Purok 5">Purok 5</option>
              </select></th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Middle Name</th>
                    <th>Suffix</th>
                    <th>Age</th>
                    <th>Birthdate</th>
                    <th>SE Status</th>
                    <th>Civil Status</th>
                    <th>Nag plano manganak</th>
                    <th>Karun</th>
                    <th>Spacing</th>
                    <th>Limiting</th>
                    <th>Fecund</th>
                    <th>Infecund</th>
                    <th>FB method used</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Gusto mo balhin ug Method</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in filteredRecords" :key="record.id">
                    <td>{{ record.purok }}</td>
                    <td>{{ record.lastname }}</td>
                    <td>{{ record.firstname }}</td>
                    <td>{{ record.middlename }}</td>
                    <td>{{ record.suffix }}</td>
                    <td>{{ record.age }}</td>
                    <td>{{ record.birthdate }}</td>
                    <td>{{ record.seStatus }}</td>
                    <td>{{ record.civilStatus }}</td>
                    <td>{{ record.planoManganak }}</td>
                    <td>{{ record.karun ? '✔' : '' }}</td>
                    <td>{{ record.spacing ? '✔' : '' }}</td>
                    <td>{{ record.limiting ? '✔' : '' }}</td>
                    <td>{{ record.fecund ? '✔' : '' }}</td>
                    <td>{{ record.infecund ? '✔' : '' }}</td>
                    <td>{{ record.fbMethod }}</td>
                    <td>{{ record.fbType }}</td>
                    <td>{{ record.fbDate }}</td>
                    <td>{{ record.changeMethod }}</td>
                    <td>
                      <button class="btn btn-secondary btn-sm me-2" @click="editRecordFunc(record)">Edit</button>
                      <button v-if="userRole === 'Admin'" class="btn btn-danger btn-sm me-2" @click="deleteRecord(record)">Delete</button>
                      <button v-if="userRole === 'Admin'" class="btn btn-warning btn-sm" @click="archiveRecord(record)">Archive</button>
                    </td>
                  </tr>

                  <tr v-if="filteredRecords.length === 0">
                    <td colspan="20" class="text-center">No records found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Modal for Editing Record -->
        <div class="modal fade show d-block" tabindex="-1" v-if="showEditModal" style="background: rgba(0,0,0,0.6)">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit WRA Record: {{ editRecord.firstname }} {{ editRecord.lastname }}</h5>
                <button type="button" class="btn-close" @click="showEditModal = false"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="saveEdit">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label>Purok</label>
                      <select v-model="editRecord.purok" class="form-control" required>
                        <option value="Purok 1">Purok 1</option>
                        <option value="Purok 2">Purok 2</option>
                        <option value="Purok 3">Purok 3</option>
                        <option value="Purok 5">Purok 5</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input v-model="editRecord.lastname" type="text" class="form-control" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>First Name</label>
                      <input v-model="editRecord.firstname" type="text" class="form-control" required>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Middle Name</label>
                      <input v-model="editRecord.middlename" type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Suffix</label>
                      <input v-model="editRecord.suffix" type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Age</label>
                      <input v-model.number="editRecord.age" type="number" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Birthdate</label>
                      <input v-model="editRecord.birthdate" type="date" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>SE Status</label>
                      <select v-model="editRecord.seStatus" class="form-control">
                        <option value="Eligible">Eligible</option>
                        <option value="Not Eligible">Not Eligible</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Civil Status</label>
                      <select v-model="editRecord.civilStatus" class="form-control">
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Nag plano manganak</label>
                      <select v-model="editRecord.planoManganak" class="form-control">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Karun</label>
                      <input v-model="editRecord.karun" type="checkbox" class="form-check-input">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Spacing</label>
                      <input v-model="editRecord.spacing" type="checkbox" class="form-check-input">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Limiting</label>
                      <input v-model="editRecord.limiting" type="checkbox" class="form-check-input">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Fecund</label>
                      <input v-model="editRecord.fecund" type="checkbox" class="form-check-input">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Infecund</label>
                      <input v-model="editRecord.infecund" type="checkbox" class="form-check-input">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>FB Method Used</label>
                      <input v-model="editRecord.fbMethod" type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Type</label>
                      <input v-model="editRecord.fbType" type="text" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Date</label>
                      <input v-model="editRecord.fbDate" type="date" class="form-control">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label>Gusto mo balhin ug Method</label>
                      <select v-model="editRecord.changeMethod" class="form-control">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showEditModal = false">Cancel</button>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal for Report -->
        <div v-if="showReportModal" class="records-overlay">
          <div class="records-box d-flex flex-column align-items-center">
            <!-- back button (left) and a compact export button (top-right) positioned absolutely so they don't affect layout -->
            <button class="back-btn" @click="showReportModal = false">← back</button>
            <button class="export-small-btn" @click="exportPdf" title="Export PDF">⤓</button>
            <div ref="reportRef" class="report-container py-4 bg-white shadow rounded">
              <WraExport />
            </div>
          </div>
        </div>

      </div>
    </div>
  </DashboardView>
</template>

<style scoped>
.maternal-bg {
  background: url('/images/maternal.jpg') no-repeat center center;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal { overflow-y: auto }

.records-top { align-items: center }
.search-box { max-width: 540px }
.search-input { border-radius: 28px 0 0 28px }
.search-btn { border-radius: 0 28px 28px 0 }
.table-wrapper { border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.95); }
.table-wrapper { height: calc(100vh - 260px); display: flex; flex-direction: column; }
.table-responsive.large-table { flex: 1 1 auto; height: 100%; overflow: auto }
.large-table table { font-size: 1.05rem; margin-bottom: 0 }
.large-table thead th { padding: 1rem; font-size: 1rem; position: sticky; top: 0; background: #fff; z-index: 5 }
.large-table tbody td { padding: 0.9rem }

@media (max-width: 768px) {
  .search-box { max-width: 100% }
  .large-table thead th { font-size: 0.95rem }
}

.records-overlay {
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: 90%;
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
  top: 100px;
  left: -50px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: bold;
  color: #000;
  font-size: 1.35rem;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 2001;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.back-btn:hover {
  transform: scale(1.1);
}
.report-container {
  max-width: 1100px;
  padding-left: 3rem;
  padding-right: 3rem;
  max-height: 80vh;
  overflow-y: auto;
}

.export-small-btn {
  position: absolute;
  top: 100px;
  right: 12px;
  background-color: rgba(43, 122, 11, 0.95);
  color: #fff;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1;
  min-width: 48px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2001;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.export-small-btn:hover { background-color: #236008 }

/* Prevent breaking inside important blocks when printing */
.no-break, .report-container * {
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
}

@media print {
  .records-overlay { background: #fff !important; }
  .records-box { box-shadow: none !important; background: #fff !important; }
  .report-container { max-height: none !important; overflow: visible !important; }
  .back-btn, .export-btn { display: none !important; }
}
</style>