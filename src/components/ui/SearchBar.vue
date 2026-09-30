<script setup lang="ts">
import Icon from '../Icon.vue'
defineProps<{ modelValue: string; placeholder?: string }>()
defineEmits<{ (e: 'update:modelValue', v: string): void }>()
</script>

<template>
  <div class="searchbar">
    <Icon name="search" :size="16" />
    <input
      :value="modelValue"
      :placeholder="placeholder ?? 'Cari...'"
      @input="(e) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
  </div>
</template>
