<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from './Icon.vue'
import ThemeSwitch from './ui/ThemeSwitch.vue'

const route = useRoute()
const router = useRouter()

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', to: '/' },
  { id: 'documents', label: 'Dokumen', icon: 'folder', to: '/dokumen' },
  { id: 'search',    label: 'Pencarian', icon: 'search', to: '/pencarian' },
  { id: 'audit',     label: 'Log Audit', icon: 'clock', to: '/audit' },
] as const

const activeId = computed(() => route.name as string)
function go(to: string){ router.push(to) }
</script>

<template>
  <aside class="sidebar">
    <div class="brand">
      <span class="mark"><Icon name="archive" :size="16" /></span>
      <div>
        <div class="name">DoksliApps</div>
      </div>
    </div>

    <nav>
      <button
        v-for="item in nav"
        :key="item.id"
        class="navlink"
        :class="{ active: activeId === item.id }"
        @click="go(item.to)"
      >
        <Icon :name="item.icon" :size="16" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <!-- ThemeSwitch komponen terpisah — pasti muncul di semua halaman -->
    <div class="sidebar-bottom">
      <ThemeSwitch />
    </div>
  </aside>
</template>

<style scoped>
.sidebar{
  background:var(--surface); border-right:1px solid var(--border);
  padding:18px 14px 14px;
  display:flex; flex-direction:column; gap:22px;
  min-height:100vh; position:sticky; top:0; align-self:stretch;
}
@media (max-width:760px){
  .sidebar{
    border-right:none; border-bottom:1px solid var(--border);
    padding:14px 16px; flex-direction:row; align-items:center; flex-wrap:wrap; gap:12px;
    min-height:auto; position:relative;
  }
  .brand{ margin-right:auto; }
  nav{ order:3; width:100%; display:flex; flex-direction:row; gap:4px; overflow-x:auto; }
  .navlink{ flex:1; justify-content:center; white-space:nowrap; }
  .sidebar-bottom{ order:2; margin-left:auto; min-width:140px; flex-shrink:0; }
}
.brand{ display:flex; align-items:center; gap:9px; padding:0 4px; }
.mark{
  width:28px; height:28px; border-radius:7px; background:var(--accent); color:var(--accent-contrast);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.name{ font-weight:700; font-size:15px; letter-spacing:-.01em; color:var(--text); }
.sub{ font-size:10.5px; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }
nav{ display:flex; flex-direction:column; gap:2px; flex:1; }
@media (max-width:760px){ nav{ flex:none; } }
.navlink{
  display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px;
  color:var(--text-muted); border:none; background:none; width:100%; text-align:left;
  font-weight:500; font-size:14px; cursor:pointer; transition:background .15s, color .15s;
}
.navlink svg{ flex-shrink:0; opacity:.85; }
.navlink:hover{ background:var(--surface-2); color:var(--text); }
.navlink.active{ background:var(--accent-soft); color:var(--accent); }
.navlink.active svg{ opacity:1; }
.sidebar-bottom{ margin-top:auto; }
@media (max-width:760px){ .sidebar-bottom{ margin-top:0; } }
</style>
