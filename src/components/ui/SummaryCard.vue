<script setup lang="ts">
defineProps<{ label: string; value: string | number; hint: string }>()
</script>

<template>
  <div class="stat">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
    <div class="hint">{{ hint }}</div>
  </div>
</template>
