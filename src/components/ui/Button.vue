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

<style scoped>
/* scoped override untuk danger — agar tetap konsisten walau style global */
.btn.danger{ background:var(--danger-soft); border-color:var(--danger-soft); color:var(--danger); }
.btn.danger:hover{ filter:brightness(1.05); }
</style>
