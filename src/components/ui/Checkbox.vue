<script setup lang="ts">
import Icon from '../Icon.vue'

defineProps<{
  modelValue: boolean
  label: string
  icon?: string
}>()
defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()
</script>

<template>
  <label
    class="app-check"
    :class="{ checked: modelValue }"
    @click.prevent="$emit('update:modelValue', !modelValue)"
  >
    <input type="checkbox" :checked="modelValue" tabindex="-1" aria-hidden="true" />
    <span class="box">
      <Icon v-if="modelValue" name="check" :size="12" />
    </span>
    <Icon v-if="icon" :name="icon" :size="14" class="lbl-icon" />
    <span class="lbl">{{ label }}</span>
  </label>
</template>

<style scoped>
.app-check{
  display:inline-flex; align-items:center; gap:7px;
  padding:7px 12px; border-radius:8px;
  border:1px solid var(--border); background:var(--surface);
  font-size:12.5px; font-weight:500; color:var(--text-muted);
  cursor:pointer; user-select:none; transition:all .15s;
}
.app-check:hover{ border-color:var(--accent); color:var(--text); background:var(--surface-2); }
.app-check.checked{
  border-color:var(--accent); background:var(--accent-soft); color:var(--accent);
}
.app-check input{ position:absolute; opacity:0; pointer-events:none; }
.box{
  width:18px; height:18px; border-radius:5px;
  border:1.5px solid var(--border); background:var(--surface);
  display:inline-flex; align-items:center; justify-content:center;
  flex-shrink:0; transition:all .15s;
}
.app-check:hover .box{ border-color:var(--accent); }
.app-check.checked .box{
  background:var(--accent); border-color:var(--accent); color:var(--accent-contrast);
}
.lbl-icon{ opacity:.7; flex-shrink:0; }
.app-check.checked .lbl-icon{ opacity:1; }
.lbl{ line-height:1; }
</style>
