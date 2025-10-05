import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/components/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import HpsView from '@/views/HpsView.vue'
import Maternal from '@/views/Maternal.vue'
import Childcare from '@/views/Childcare.vue'
import Familyplanning from '@/views/Familyplanning.vue'
import Phs from '@/views/Phs.vue'
import Calendar from '@/views/Calendar.vue'
import Inventory from '@/views/Inventory.vue'
import ReportView from '@/views/ReportView.vue'
import HpsRecords from '@/views/HpsRecords.vue'
import HhpsRecords from '@/views/HhpsRecords.vue'
import MaternalWrarecords from '@/views/MaternalWrarecords.vue'
import MaternalCcsrecords from '@/views/MaternalCcsrecords.vue'
import ChildcareRecords from '@/views/ChildcareRecords.vue'
import FpsRecords from '@/views/FpsRecords.vue'
import PhsRecords from '@/views/PhsRecords.vue'
import RegisterView from '@/views/RegisterView.vue'
import AdminDashboardview from '@/components/AdminDashboardview.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/home',
      name: 'Homeview',
      component: HomeView,
    },
    {
      path: '/householdprofile',
      name: 'householdprofiling',
      component: HpsView,
    },
    {
      path: '/maternalservices',
      name: 'maternalservices',
      component: Maternal,
    },
    {
      path: '/childcare',
      name: 'childcare',
      component: Childcare,
    },
    {
      path: '/familyplanning',
      name: 'familyplanning',
      component: Familyplanning,
    },
    {
      path: '/preventivehealhservices',
      name: 'preventivehealhservices',
      component: Phs,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: Inventory,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportView,
    },
    {
      path: '/hpsrecords',
      name: 'hpsrecords',
      component: HpsRecords,
    },
    {
      path: '/hhpsrecords',
      name: 'hhpsrecords',
      component: HhpsRecords,
    },
    {
      path: '/maternalwrarecords',
      name: 'maternalwrarecords',
      component: MaternalWrarecords,
    },
    {
      path: '/maternalccsrecords',
      name: 'maternalccsrecords',
      component: MaternalCcsrecords,
    },
    {
      path: '/childcarerecords',
      name: 'childcarerecords',
      component: ChildcareRecords,
    },
    {
      path: '/fpsrecords',
      name: 'fpsrecords',
      component: FpsRecords,
    },
    {
      path: '/phsrecords',
      name: 'phsrecords',
      component: PhsRecords,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admindashboard',
      name: 'admindashboard',
      component: AdminDashboardview,
    },
  ],
})

export default router
