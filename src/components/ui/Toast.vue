<script setup lang="ts">
import { toastState } from '../../composables/useToast'
import Icon from '../Icon.vue'
</script>

<template>
  <div class="toasts">
    <div v-for="t in toastState" :key="t.id" class="toast">
      <Icon name="archive" :size="14" />
      <span>{{ t.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.toasts{
  position:fixed; right:16px; bottom:16px;
  display:flex; flex-direction:column; gap:8px;
  z-index:60; max-width:min(320px, calc(100vw - 32px));
}
.toast{
  background:var(--text); color:var(--bg);
  padding:10px 14px; border-radius:9px;
  font-size:12.5px; font-weight:500;
  box-shadow:var(--shadow);
  display:flex; align-items:center; gap:8px;
  animation: toastin .18s ease;
}
@keyframes toastin{ from{ opacity:0; transform:translateY(6px);} to{opacity:1; transform:none;} }
</style>
