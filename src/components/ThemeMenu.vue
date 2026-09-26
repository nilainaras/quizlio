<template>
    <div class="theme-menu">
        <h1>Quizlio</h1>
        <p class="subtitle">Choisis un thème pour démarrer</p>
        <div class="theme-grid">
            <button v-for="theme in themes" :key="theme.name" class="theme-card" @click="chooseTheme(theme.name)">
                <span class="theme-icon">
                    <i v-if="theme.icon" :class="theme.icon"></i>
                    <svg v-else-if="theme.custom === 'utensils'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2v6M8 2v6M10 2v6" />
                        <path d="M6 8c0 2.2 4 2.2 4 0" />
                        <path d="M8 8v14" />
                        <path d="M17 2c2.2 0 3.4 2.3 3.4 5.2S19.2 12 17 12" />
                        <path d="M17 2v20" />
                    </svg>
                    <svg v-else-if="theme.custom === 'gamepad'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M6 8h12a4 4 0 0 1 4 4l1 4a2.5 2.5 0 0 1-4.3 1.8L16 15H8l-2.7 2.8A2.5 2.5 0 0 1 1 16l1-4a4 4 0 0 1 4-4Z" />
                        <path d="M8 10v4M6 12h4" />
                        <circle cx="16" cy="11" r="0.8" fill="currentColor" stroke="none" />
                        <circle cx="18.5" cy="13" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                </span>
                <span>{{ theme.name }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button'

const themes = [
    { name: 'Histoire/Mythologie', icon: 'pi pi-building-columns' },
    { name: 'Science/Tech', icon: 'pi pi-microchip-ai' },
    { name: 'Informatique', icon: 'pi pi-code' },
    { name: 'Sport', icon: 'pi pi-trophy' },
    { name: 'Gastronomie', custom: 'utensils' },
    { name: 'Art', icon: 'pi pi-palette' },
    { name: 'Géographie', icon: 'pi pi-map' },
    { name: 'Gaming', custom: 'gamepad' }
]

const emit = defineEmits(['theme-selected'])
function chooseTheme(theme) {
    emit('theme-selected', theme)
}
</script>

<style scoped>
.theme-menu {
    width: min(720px, 90vw);
    margin: 4rem auto;
    text-align: center;
}

.subtitle {
    opacity: 0.7;
    margin-bottom: 2.5rem;
}

.theme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
}

.theme-card {
    background: #1e262c;
    border: 1px solid #2a333a;
    border-radius: 12px;
    padding: 1.75rem 1rem;
    color: #f3efe6;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.theme-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.75rem;
    color: #f2b84b;
}

.theme-icon i {
    font-size: 1.75rem;
}

.theme-icon svg {
    width: 1.75rem;
    height: 1.75rem;
}

.theme-card:hover {
    transform: translateY(-4px);
    border-color: #f2b84b;
    background: #232c33;
}
</style>