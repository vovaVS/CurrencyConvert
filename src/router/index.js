import ConvertView from '@/views/CurrencyView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MenuView from "@/views/MenuView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MenuView',
      component: MenuView,
    },
    {
      path: '/currency',
      name: 'CurrencyView',
      component: () => import('@/views/CurrencyView.vue')
    },
    {
      path: '/weight',
      name: 'WeightView',
      component: () => import('@/views/WeightView.vue')
    },
    {
      path: '/width',
      name: 'WidthView',
      component: () => import('@/views/WidthView.vue')
    },
    {
      path: '/time',
      name: 'TimeView',
      component: () => import('@/views/TimeView.vue'),
    },
    {
      path: '/course',
      name: 'CourseView',
      component: () => import('@/views/CourseView.vue'),
    }
  ],
})

export default router
