<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import Button from '../components/ui/Button.vue'
import { auditLog } from '../data/sampleData'

const user = ref('')
const action = ref('')

const users = computed(() => [...new Set(auditLog.map(a => a.user))])
const actions = computed(() => [...new Set(auditLog.map(a => a.action))])

const rows = computed(() => {
  let r = [...auditLog]
  if (user.value) r = r.filter(x => x.user === user.value)
  if (action.value) r = r.filter(x => x.action === action.value)
  return r
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="panel">
      <div class="panel-body">
        <div class="filters">
          <select :value="user" @change="user = ($event.target as HTMLSelectElement).value">
            <option value="">Semua pengguna</option>
            <option v-for="u in users" :key="u">{{ u }}</option>
          </select>
          <select :value="action" @change="action = ($event.target as HTMLSelectElement).value">
            <option value="">Semua aksi</option>
            <option v-for="a in actions" :key="a">{{ a }}</option>
          </select>
          <Button variant="ghost" class="ml-auto" @click="() => {}">
            <Icon name="download" :size="14" /> Ekspor CSV
          </Button>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-body p-0">
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Pengguna</th>
                <th>Aksi</th>
                <th>Objek</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.id">
                <td class="num">{{ r.time }}</td>
                <td>{{ r.user }}</td>
                <td>{{ r.action }}</td>
                <td class="muted">{{ r.object }}</td>
                <td class="num">{{ r.ip }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="rows.length === 0" class="empty">
          <Icon name="clock" :size="26" />
          <div>Tidak ada catatan yang cocok.</div>
        </div>
      </div>
    </div>
  </div>
</template>
