<script setup lang="ts">
import type { Folder } from '../../data/sampleData'
import { documents } from '../../data/sampleData'
import Icon from '../Icon.vue'

defineProps<{ folders: Folder[] }>()
defineEmits<{ (e: 'select', id: string): void }>()

function count(folderId: string){
  return documents.filter(d => d.folderId === folderId && !d.deletedAt).length
}
</script>

<template>
  <div class="folder-grid">
    <button
      v-for="f in folders"
      :key="f.id"
      class="folder-row"
      @click="$emit('select', f.id)"
    >
      <Icon name="folder" :size="17" />
      <span>{{ f.name }}</span>
      <span v-if="f.restricted" class="count flex items-center gap-1.5"><Icon name="search" :size="11" />terbatas</span>
      <span v-else class="count">{{ count(f.id) }} dokumen</span>
    </button>
  </div>
</template>
