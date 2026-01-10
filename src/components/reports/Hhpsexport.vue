<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const fetchHeadRecords = async () => {
  loading.value = true
  error.value = null
  try {
    const { data, error: err } = await supabase
      .from('household_heads')
      .select('*')
      .order('created_at', { ascending: false })

    if (err) throw err
    headRecords.value = data
  } catch (e) {
    console.error(e)
    error.value = 'Failed to load household head records.'
  } finally {
    loading.value = false
  }
}

// View Members
const viewMembers = async (head) => {
  selectedHead.value = head
  showMembersModal.value = true
  members.value = []
  try {
    // ✅ Adjust this based on your real column name
    const { data, error: err } = await supabase
      .from('household_members')
      .select('*')
      .eq('head_id', head.head_id) // if your PK is head_id instead of id

    if (err) throw err
    members.value = data
  } catch (e) {
    console.error(e)
    alert('Error loading household members.')
  }
}
</script>

<template>
  <!-- FIRST REPORT CONTENT -->
  <div>
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
      <h4 class="fw-bold">Overall Household Report</h4>
      <p>
        Barangay 5 – Municipality of Buenavista, Agusan del Norte <br />
        Reporting Period: September 2025
      </p>
    </div>

    <section class="mb-4">
      
    </section>

    
  </div>
</template>
