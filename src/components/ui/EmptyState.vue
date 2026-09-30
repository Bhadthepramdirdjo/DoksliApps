<script setup lang="ts">
import Icon from '../Icon.vue'
defineProps<{ icon?: string; title: string; hint?: string }>()
</script>

<template>
  <div class="empty">
    <Icon :name="icon ?? 'file'" :size="26" />
    <div>{{ title }}</div>
    <div v-if="hint" class="muted text-xs">{{ hint }}</div>
    <slot />
  </div>
</template>
