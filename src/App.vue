<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Toast from './components/ui/Toast.vue'
import { useTheme } from './composables/useTheme'

const route = useRoute()
const { init } = useTheme()
onMounted(() => init())
</script>

<template>
  <div class="app">
    <Sidebar />
    <main>
      <div class="topbar">
        <h1>{{ (route.meta.title as string) ?? 'Dashboard' }}</h1>
        <div class="persona">Masuk sebagai <b>Bhadriko Theo</b> &middot; admin adminan</div>
      </div>
      <router-view />
    </main>
    <Toast />
  </div>
</template>
