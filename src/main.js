import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import App from './App.vue'

const QuizlioTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#FEF9EC', 100: '#FDF0C9', 200: '#FBE39D', 300: '#F8D470',
            400: '#F5C654', 500: '#F2B84B', 600: '#D99F3E', 700: '#B37F30',
            800: '#8C6224', 900: '#664717', 950: '#40300E'
        }
    }
})

const app = createApp(App)
app.use(PrimeVue, {
    theme: { preset: QuizlioTheme, options: { darkModeSelector: '.app-dark' } }
})
app.mount('#app')