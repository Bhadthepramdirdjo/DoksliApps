import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { title: 'Dashboard' },
    },
    {
      path: '/dokumen',
      name: 'documents',
      component: () => import('../views/DokumenView.vue'),
      meta: { title: 'Dokumen' },
    },
    {
      path: '/pencarian',
      name: 'search',
      component: () => import('../views/PencarianView.vue'),
      meta: { title: 'Pencarian' },
    },
    {
      path: '/audit',
      name: 'audit',
      component: () => import('../views/AuditView.vue'),
      meta: { title: 'Log Audit' },
    },
  ],
})

export default router
