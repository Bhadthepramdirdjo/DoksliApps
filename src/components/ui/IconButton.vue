<script setup lang="ts">
import Icon from '../Icon.vue'
defineProps<{
  icon: string
  title?: string
  disabled?: boolean
}>()
</script>

<template>
  <button class="iconbtn" :title="title" :disabled="disabled" :aria-label="title">
    <Icon :name="icon" :size="15" />
  </button>
</template>
