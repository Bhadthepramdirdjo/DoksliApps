<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="panel">
    <div v-if="$slots.header || title" class="panel-head">
      <h2 v-if="title">{{ title }}</h2>
      <slot name="header" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>
