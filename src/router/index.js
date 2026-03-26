import ConvertView from '@/views/ConvertView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ConvertView',
      component: ConvertView,
    },
    {
      path: '/course',
      name: 'CourseView',
      component: () => import('@/views/CourseView.vue'),
    }
  ],
})

export default router
