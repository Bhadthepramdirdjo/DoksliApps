<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '../components/ui/SearchBar.vue'
import DocumentTable from '../components/ui/DocumentTable.vue'
import DocumentDrawer from '../components/ui/DocumentDrawer.vue'
import Checkbox from '../components/ui/Checkbox.vue'
import Icon from '../components/Icon.vue'
import type { Doc } from '../data/sampleData'
import { documents, folders } from '../data/sampleData'

const q = ref('')
const category = ref('')
const folder = ref('')
const includeTrash = ref(false)
const drawerDoc = ref<Doc | null>(null)
const drawerOpen = ref(false)

const categories = ['Kontrak','Keuangan','SDM','Legal','Korespondensi'] as const

const results = computed(() => {
  let r = [...documents]
  if (!includeTrash.value) r = r.filter(d => !d.deletedAt)
  if (q.value) {
    const qq = q.value.toLowerCase()
    r = r.filter(d => d.name.toLowerCase().includes(qq) || d.owner.toLowerCase().includes(qq) || d.tags.some(t => t.toLowerCase().includes(qq)))
  }
  if (category.value) r = r.filter(d => d.category === category.value)
  if (folder.value) r = r.filter(d => d.folderId === folder.value)
  return r
})

function onDownload(_id:string){ /* no-op: download belum diimplementasi */ }
function onTrash(_id:string){ /* no-op: hapus belum diimplementasi */ }
function onOpen(id:string){
  const d = documents.find(d=>d.id===id) ?? null
  drawerDoc.value = d
  drawerOpen.value = true
}
function closeDrawer(){ drawerOpen.value = false }
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="panel">
      <div class="panel-body flex flex-col gap-3">
        <SearchBar v-model="q" placeholder="Cari nama dokumen, tag, atau pemilik…" />
        <div class="filters">
          <select :value="category" @change="category = ($event.target as HTMLSelectElement).value">
            <option value="">Semua kategori</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <select :value="folder" @change="folder = ($event.target as HTMLSelectElement).value">
            <option value="">Semua folder</option>
            <option v-for="f in folders" :key="f.id" :value="f.id">{{ f.name }}</option>
          </select>
          <Checkbox v-model="includeTrash" label="Sertakan tempat sampah" icon="trash" />
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <h2>{{ results.length }} hasil ditemukan</h2>
        <span v-if="q || category || folder" class="muted text-xs">filter aktif</span>
      </div>
      <div class="panel-body">
        <DocumentTable
          v-if="results.length"
          :docs="results"
          @open="onOpen"
          @download="onDownload"
          @trash="onTrash"
        />
        <div v-else class="empty">
          <Icon name="search" :size="26" />
          <div>Tidak ada dokumen yang cocok.</div>
        </div>
      </div>
    </div>
  </div>

  <DocumentDrawer :doc="drawerDoc" :open="drawerOpen" @close="closeDrawer" />
</template>
