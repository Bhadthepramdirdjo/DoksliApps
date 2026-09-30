<script setup lang="ts">
defineProps<{ category: string }>()
</script>

<template>
  <span class="pill" :class="'cat-' + category">
    <span class="dot"></span>{{ category }}
  </span>
</template>

<style scoped>
.pill{
  display:inline-flex; align-items:center; gap:5px;
  padding:2px 9px; border-radius:999px;
  font-size:11.5px; font-weight:600; white-space:nowrap;
  border:1px solid transparent;
}
.dot{ width:6px; height:6px; border-radius:50%; }
.cat-Kontrak{ background:var(--accent-soft); color:var(--accent); border-color:var(--accent-soft); }
.cat-Kontrak .dot{ background:var(--accent); }
.cat-Keuangan{ background:var(--success-soft); color:var(--success); border-color:var(--success-soft); }
.cat-Keuangan .dot{ background:var(--success); }
.cat-SDM{ background:var(--warning-soft); color:var(--warning); border-color:var(--warning-soft); }
.cat-SDM .dot{ background:var(--warning); }
.cat-Legal{ background:var(--danger-soft); color:var(--danger); border-color:var(--danger-soft); }
.cat-Legal .dot{ background:var(--danger); }
.cat-Korespondensi{ background:var(--locked-soft); color:var(--locked); border-color:var(--locked-soft); }
.cat-Korespondensi .dot{ background:var(--locked); }
</style>
