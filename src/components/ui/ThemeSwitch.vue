<script setup lang="ts">
import Icon from '../Icon.vue'
import { useTheme } from '../../composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <div class="theme-toggle" :class="{ dark: theme === 'dark' }">
    <span class="label">
      <Icon :name="theme === 'dark' ? 'moon' : 'sun'" :size="13" />
      Tema
    </span>
    <button class="switch" :class="{ on: theme === 'dark' }" @click="toggle()" :aria-label="theme === 'dark' ? 'Ganti ke terang' : 'Ganti ke gelap'">
      <span class="track"><span class="thumb" /></span>
    </button>
  </div>
</template>

<style scoped>
.theme-toggle{
  display:flex; align-items:center; justify-content:space-between;
  padding:8px 10px; border-top:1px solid var(--border);
}
.label{
  display:flex; align-items:center; gap:6px;
  font-size:11px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  color:var(--text-muted);
}
.switch{ border:none; background:none; padding:0; cursor:pointer; display:flex; }
.track{
  width:34px; height:20px; border-radius:99px; background:var(--border);
  display:flex; align-items:center; padding:2px; transition:background .2s;
}
.switch.on .track{ background:var(--accent); }
.thumb{
  width:16px; height:16px; border-radius:50%; background:var(--surface);
  display:block; transform:translateX(0); transition:transform .2s;
  box-shadow:0 1px 3px rgba(0,0,0,.2);
}
.switch.on .thumb{ transform:translateX(14px); }
</style>
