<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import Button from '../components/ui/Button.vue'
import DocumentTable from '../components/ui/DocumentTable.vue'
import DocumentDrawer from '../components/ui/DocumentDrawer.vue'
import FolderList from '../components/ui/FolderList.vue'
import type { Doc } from '../data/sampleData'
import { folders, documents } from '../data/sampleData'

const tab = ref<'active' | 'trash'>('active')
const currentFolder = ref<string | null>(null)
const drawerDoc = ref<Doc | null>(null)
const drawerOpen = ref(false)

const activeFolder = computed(() => folders.find(f => f.id === currentFolder.value) ?? null)
const activeDocs = computed(() => {
  if (tab.value === 'trash') return documents.filter(d => d.deletedAt)
  if (!activeFolder.value) return []
  return documents.filter(d => d.folderId === activeFolder.value!.id && !d.deletedAt)
})

function selectFolder(id: string){ currentFolder.value = id }
function clearFolder(){ currentFolder.value = null }

function onDownload(_id: string){
  // no-op: download belum diimplementasi
}
function onTrash(_id: string){
  // no-op: hapus belum diimplementasi
}
function onRestore(_id: string){
  // no-op: pulihkan belum diimplementasi
}
function onOpen(id: string){
  const d = documents.find(x => x.id === id) ?? null
  drawerDoc.value = d
  drawerOpen.value = true
}
function closeDrawer(){ drawerOpen.value = false }
</script>

<template>
  <div class="panel">
    <div class="panel-head">
      <div class="crumbs">
        <button :class="{ current: !activeFolder }" @click="clearFolder()">Semua Folder</button>
        <template v-if="activeFolder">
          <Icon name="chevron" :size="13" />
          <button class="current">{{ activeFolder.name }}</button>
        </template>
      </div>
      <Button v-if="tab === 'active'" variant="primary" size="sm" @click="() => {}">
        <Icon name="plus" :size="14" /> Unggah Dokumen
      </Button>
    </div>

    <div class="panel-body pt-2.5">
      <div class="tabs">
        <button class="tab" :class="{ active: tab === 'active' }" @click="tab = 'active'">Aktif</button>
        <button class="tab" :class="{ active: tab === 'trash' }" @click="tab = 'trash'">Tempat Sampah</button>
      </div>

      <template v-if="tab === 'trash'">
        <DocumentTable
          v-if="activeDocs.length"
          :docs="activeDocs"
          trash-view
          @open="onOpen"
          @restore="onRestore"
        />
        <div v-else class="empty !py-9">
          <Icon name="trash" :size="26" />
          <div>Tempat sampah kosong.</div>
        </div>
      </template>

      <template v-else>
        <template v-if="!activeFolder">
          <FolderList :folders="folders" @select="selectFolder" />
          <p class="muted text-xs mt-3">Klik folder untuk lihat dokumen.</p>
        </template>
        <template v-else>
          <button class="btn ghost sm mb-3" @click="clearFolder()">
            <Icon name="chevron" :size="12" style="transform:rotate(180deg)" /> Kembali ke semua folder
          </button>
          <DocumentTable
            v-if="activeDocs.length"
            :docs="activeDocs"
            @open="onOpen"
            @download="onDownload"
            @trash="onTrash"
          />
          <div v-else class="empty">
            <Icon name="file" :size="26" />
            <div>Belum ada dokumen di folder ini.</div>
          </div>
        </template>
      </template>
    </div>
  </div>

  <DocumentDrawer :doc="drawerDoc" :open="drawerOpen" @close="closeDrawer" />
</template>
