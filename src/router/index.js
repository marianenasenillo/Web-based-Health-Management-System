import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/components/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import HpsView from '@/views/HpsView.vue'
import Maternal from '@/views/Maternal.vue'
import Childcare from '@/views/Childcare.vue'
import Familyplanning from '@/views/Familyplanning.vue'
import Phs from '@/views/Phs.vue'

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
  ],
})

export default router
