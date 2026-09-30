<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SummaryCard from '../components/ui/SummaryCard.vue'
import Icon from '../components/Icon.vue'
import { documents, auditLog, folders, fmtSize, totalSize } from '../data/sampleData'

const router = useRouter()

const activeDocs = computed(() => documents.filter(d => !d.deletedAt))
const trashCount = computed(() => documents.filter(d => d.deletedAt).length)
const totalKb = computed(() => totalSize())
const todayStr = '21 Sep 2026'
const todayCount = computed(() => auditLog.filter(a => a.time.startsWith(todayStr)).length)
const recent = computed(() => auditLog.slice(0, 6))
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-2.5 items-start rounded-[10px] px-3 py-2.5 text-[12.5px] border"
         :style="{ background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--accent-soft)' }">
      <Icon name="archive" :size="16" class="mt-px shrink-0" />
      <div><strong :style="{ color: 'var(--text)' }">Ringkasan sistem.</strong> Data sampleData dari prototype — 14 dokumen & 5 folder.</div>
    </div>

    <div class="stats">
      <SummaryCard label="Total Dokumen" :value="activeDocs.length" :hint="folders.length + ' folder'" />
      <SummaryCard label="Penyimpanan Terpakai" :value="fmtSize(totalKb)" hint="akumulasi versi terbaru" />
      <SummaryCard label="Di Tempat Sampah" :value="trashCount" hint="soft delete" />
      <SummaryCard label="Aktivitas Hari Ini" :value="todayCount" :hint="todayStr" />
    </div>

    <div class="panel">
      <div class="panel-head">
        <h2>Aktivitas Terbaru</h2>
        <button class="btn ghost sm" @click="router.push('/audit')">Lihat semua</button>
      </div>
      <div class="panel-body !pt-1 !pb-1.5">
        <div v-for="a in recent" :key="a.id" class="flex items-start gap-2.5 text-[12.5px] py-[7px] border-b last:border-0" :style="{ borderColor: 'var(--border)' }">
          <span class="mono text-[11px] whitespace-nowrap pt-px" :style="{ color: 'var(--text-muted)' }">{{ a.time }}</span>
          <span><b>{{ a.user }}</b> — {{ a.action }}<template v-if="a.object !== '—'"> &middot; {{ a.object }}</template></span>
        </div>
      </div>
    </div>
  </div>
</template>
