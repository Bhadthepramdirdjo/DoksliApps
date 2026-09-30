<script setup lang="ts">
import type { Doc } from '../../data/sampleData'
import { fmtSize } from '../../data/sampleData'
import Icon from '../Icon.vue'
import IconButton from './IconButton.vue'
import CategoryBadge from './CategoryBadge.vue'

defineProps<{ docs: Doc[]; trashView?: boolean }>()
defineEmits<{
  (e: 'open', id: string): void
  (e: 'download', id: string): void
  (e: 'trash', id: string): void
  (e: 'restore', id: string): void
}>()
</script>

<template>
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Pemilik</th>
          <th>Tanggal</th>
          <th>Ukuran</th>
          <th>Versi</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="d in docs"
          :key="d.id"
          class="clickable"
          @click="$emit('open', d.id)"
        >
          <td><div class="docname"><Icon name="file" :size="15" />{{ d.name }}</div></td>
          <td><CategoryBadge :category="d.category" /></td>
          <td class="muted">{{ d.owner }}</td>
          <td class="num">{{ trashView ? d.deletedAt : d.date }}</td>
          <td class="num">{{ fmtSize(d.versions[d.versions.length-1].size) }}</td>
          <td class="num">v{{ d.versions[d.versions.length-1].v }}</td>
          <td @click.stop>
            <div class="flex gap-1.5 justify-end">
              <template v-if="trashView">
                <IconButton icon="download" title="Pulihkan" @click="$emit('restore', d.id)" />
                <IconButton icon="trash" title="Hapus permanen" />
              </template>
              <template v-else>
                <IconButton icon="download" title="Unduh" @click="$emit('download', d.id)" />
                <IconButton icon="trash" title="Pindahkan ke sampah" @click="$emit('trash', d.id)" />
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
tr.clickable{ cursor:pointer; }
tr.clickable:hover td{ background:var(--surface-2); }
.docname{ display:flex; align-items:center; gap:9px; font-weight:600; min-width:180px; }
.docname :deep(svg){ flex-shrink:0; color:var(--text-muted); }
</style>
