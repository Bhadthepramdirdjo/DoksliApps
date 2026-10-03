<script setup lang="ts">
import { computed } from 'vue'
import type { Doc } from '../../data/sampleData'
import { fmtSize, folders, auditLog } from '../../data/sampleData'
import Icon from '../Icon.vue'
import Button from './Button.vue'
import CategoryBadge from './CategoryBadge.vue'

const props = defineProps<{ doc: Doc | null; open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const folderName = computed(() => folders.find(f => f.id === props.doc?.folderId)?.name ?? '—')
const related = computed(() => {
  if (!props.doc) return []
  return auditLog.filter(a => a.object === props.doc!.name || a.object.startsWith(props.doc!.name + ' ')).slice(0, 8)
})
const sortedVersions = computed(() => {
  if (!props.doc) return []
  return [...props.doc.versions].reverse()
})
const currentSize = computed(() => {
  if (!props.doc) return ''
  return fmtSize(props.doc.versions[props.doc.versions.length - 1].size)
})

function doDownload(){
  // no-op: download belum diimplementasi
}
function doTrash(){
  // no-op: hapus belum diimplementasi
}
function doRestore(){
  // no-op: pulihkan belum diimplementasi
}
function doRevert(_vnum: number){
  // no-op: revert belum diimplementasi
}
function doUpload(){
  // no-op: unggah versi baru belum diimplementasi
}
</script>

<template>
  <teleport to="body">
    <div v-if="open" class="scrim" :class="{ open }" @click="emit('close')" />
    <div class="drawer" :class="{ open }">
      <template v-if="doc">
        <div class="drawer-head">
          <div>
            <h2>{{ doc.name }}</h2>
            <div class="mt-1"><CategoryBadge :category="doc.category" /></div>
          </div>
          <button class="iconbtn" @click="emit('close')" aria-label="Tutup">
            <Icon name="x" :size="16" />
          </button>
        </div>

        <div class="drawer-body">
          <!-- Metadata -->
          <div>
            <div class="section-title">Metadata</div>
            <div class="field-grid">
              <div class="field"><div class="k">Folder</div><div class="v">{{ folderName }}</div></div>
              <div class="field"><div class="k">Pemilik</div><div class="v">{{ doc.owner }}</div></div>
              <div class="field"><div class="k">Tanggal dibuat</div><div class="v">{{ doc.date }}</div></div>
              <div class="field"><div class="k">Ukuran saat ini</div><div class="v">{{ currentSize }}</div></div>
              <div class="field"><div class="k">ID Dokumen</div><div class="v mono">{{ doc.id.toUpperCase() }}</div></div>
              <div class="field"><div class="k">Status</div><div class="v">{{ doc.deletedAt ? 'Di tempat sampah' : 'Aktif' }}</div></div>
            </div>
            <div v-if="doc.tags.length" class="taglist">
              <span v-for="t in doc.tags" :key="t" class="tag">
                <Icon name="search" :size="11" /> {{ t }}
              </span>
            </div>
          </div>

          <!-- Riwayat Versi -->
          <div>
            <div class="section-title">Riwayat Versi</div>
            <div v-for="(ver, idx) in sortedVersions" :key="ver.v" class="vrow" :class="{ current: idx === 0 }">
              <div class="vnum">v{{ ver.v }}</div>
              <div class="flex-1">
                <div>{{ ver.note }}</div>
                <div class="muted">{{ ver.date }} · {{ ver.uploader }} · {{ fmtSize(ver.size) }}</div>
              </div>
              <Button v-if="idx !== 0 && !doc.deletedAt" variant="ghost" size="sm" @click="doRevert(ver.v)">Jadikan aktif</Button>
            </div>
          </div>

          <!-- Aktivitas Dokumen Ini -->
          <div>
            <div class="section-title">Aktivitas Dokumen Ini</div>
            <template v-if="related.length">
              <div v-for="a in related" :key="a.id" class="actrow">
                <span class="t">{{ a.time }}</span>
                <span>{{ a.user }} — {{ a.action }}</span>
              </div>
            </template>
            <div v-else class="muted text-xs">Belum ada aktivitas tercatat.</div>
          </div>

          <!-- Actions -->
          <div class="btnrow">
            <Button variant="primary" @click="doDownload()"><Icon name="download" :size="14" />Unduh</Button>
            <Button v-if="!doc.deletedAt" @click="doUpload()"><Icon name="upload" :size="14" />Unggah Versi Baru</Button>
            <Button v-if="!doc.deletedAt" variant="danger" @click="doTrash()"><Icon name="trash" :size="14" />Pindahkan ke Sampah</Button>
            <Button v-if="doc.deletedAt" @click="doRestore()"><Icon name="upload" :size="14" style="transform:rotate(180deg)" />Pulihkan</Button>
          </div>
        </div>
      </template>
    </div>
  </teleport>
</template>

<style scoped>
.scrim{ position:fixed; inset:0; background:rgba(10,12,16,.42); opacity:0; pointer-events:none; transition:opacity .18s ease; z-index:40; }
.scrim.open{ opacity:1; pointer-events:auto; }
.drawer{
  position:fixed; top:0; right:0; height:100%; width:min(420px,100%); background:var(--surface); border-left:1px solid var(--border);
  transform:translateX(100%); transition:transform .2s ease; z-index:41; display:flex; flex-direction:column;
}
.drawer.open{ transform:translateX(0); }
.drawer-head{ display:flex; align-items:flex-start; justify-content:space-between; gap:10px; padding:16px; border-bottom:1px solid var(--border); }
.drawer-head h2{ font-size:16px; font-weight:700; color:var(--text); margin:0; }
.drawer-body{ padding:16px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:18px; }
.field-grid{ display:grid; grid-template-columns:1fr 1fr; gap:10px 14px; }
.field{ display:flex; flex-direction:column; gap:3px; }
.field .k{ font-size:11px; color:var(--text-muted); text-transform:uppercase; letter-spacing:.04em; font-weight:600; }
.field .v{ font-size:13.5px; color:var(--text); }
.taglist{ display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
.tag{ font-size:11.5px; background:var(--surface-2); border:1px solid var(--border); padding:2px 8px; border-radius:999px; color:var(--text-muted); display:inline-flex; align-items:center; gap:4px; }
.section-title{ font-size:11.5px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted); font-weight:700; margin-bottom:8px; }
.vrow{ display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid var(--border); font-size:12.5px; color:var(--text); }
.vrow:last-child{ border-bottom:none; }
.vrow .vnum{ width:26px; height:26px; border-radius:7px; background:var(--surface-2); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:11.5px; flex-shrink:0; color:var(--text); }
.vrow.current .vnum{ background:var(--accent-soft); color:var(--accent); }
.actrow{ display:flex; align-items:flex-start; gap:9px; font-size:12.5px; padding:7px 0; border-bottom:1px solid var(--border); color:var(--text); }
.actrow:last-child{ border-bottom:none; }
.actrow .t{ color:var(--text-muted); font-family:"IBM Plex Mono",monospace; font-size:11px; white-space:nowrap; padding-top:1px; }
.btnrow{ display:flex; gap:8px; flex-wrap:wrap; }

/* variant danger for Button */
:deep(.btn.danger){ background:var(--danger-soft); border-color:var(--danger-soft); color:var(--danger); }
:deep(.btn.danger:hover){ filter:brightness(1.05); }

@media (prefers-reduced-motion: reduce){
  .drawer,.scrim{ transition:none; }
}
</style>
