<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'danger' | 'ghost'
  size?: 'sm' | 'default'
  disabled?: boolean
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
})
</script>

<template>
  <button
    class="btn"
    :class="[variant, size === 'sm' ? 'sm' : '']"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
