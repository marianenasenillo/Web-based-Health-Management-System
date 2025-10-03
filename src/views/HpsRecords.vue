<script setup> 
import DashboardView from '@/components/DashboardView.vue';
</script>

<template>
    <DashboardView>
        <div class="container my-4">
        <h2 class="mb-4">Household Profile Summary</h2>
        <div class="table-responsive">
            <table class="table table-bordered">
            <thead class="table-light">
                <tr>
                <th scope="col">Household ID</th>
                <th scope="col">Head of Household</th>
                <th scope="col">Address</th>
                <th scope="col">Members</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>HH001</td>
                <td>Juan Dela Cruz</td>
                <td>123 Main St, Barangay 1</td>
                <td>5</td>
                <td>
                    <button class="btn btn-primary btn-sm me-2">View</button>
                    <button class="btn btn-secondary btn-sm">Edit</button>
                </td>
                </tr>
                <tr>
                <td>HH002</td>
                <td>Maria Santos</td>
                <td>456 Elm St, Barangay 2</td>
                <td>4</td>
                <td>
                    <button class="btn btn-primary btn-sm me-2">View</button>
                    <button class="btn btn-secondary btn-sm">Edit</button>
                </td>
                </tr>
                <!-- More rows as needed -->
            </tbody>
            </table>
        </div>
        </div>
    </DashboardView>

</template>