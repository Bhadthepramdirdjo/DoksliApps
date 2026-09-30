import { ref } from 'vue'

export type Toast = { id: number; message: string }
const toasts = ref<Toast[]>([])
let seq = 0

export function useToast() {
  function push(message: string) {
    const id = ++seq
    toasts.value.push({ id, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3200)
  }
  return { toasts, push }
}

// singleton for Toast
export const toastState = toasts
export function pushToast(msg: string) {
  const id = ++seq
  toasts.value.push({ id, message: msg })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3200)
}
