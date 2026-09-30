import { ref, watch } from 'vue'

type Theme = 'light' | 'dark'
const THEME_KEY = 'doksli-theme'
const theme = ref<Theme>('light')

function apply(t: Theme){
  document.documentElement.setAttribute('data-theme', t)
  localStorage.setItem(THEME_KEY, t)
}

export function useTheme(){
  function init(){
    const saved = localStorage.getItem(THEME_KEY) as Theme | null
    if(saved === 'dark' || saved === 'light'){
      theme.value = saved
    } else {
      theme.value = 'light' // default putih
    }
    apply(theme.value)
  }
  function toggle(){
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    apply(theme.value)
  }
  function set(t: Theme){
    theme.value = t
    apply(t)
  }
  watch(theme, (v)=> apply(v))
  return { theme, init, toggle, set }
}

// singleton instance for App
export const themeState = theme
