<template>
    <div class="score-screen">
        <svg width="180" height="180" viewBox="0 0 180 180" class="score-ring">
            <circle cx="90" cy="90" r="70" stroke="#2a333a" stroke-width="14" fill="none" />
            <circle cx="90" cy="90" r="70" fill="none" :stroke="ringColor" stroke-width="14" stroke-linecap="round"
                :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" transform="rotate(-90 90 90)"
                class="score-ring-progress" />
            <text x="90" y="98" text-anchor="middle" class="score-ring-text">{{ score }}/{{ total }}</text>
        </svg>
        <p class="score-message">{{ message }}</p>
        <div class="score-actions">
            <button class="btn-primary" @click="$emit('retry')">Réessayer</button>
            <button class="btn-secondary" @click="$emit('home')">Accueil</button>
        </div>
    </div>
</template>


<script setup>
import { computed, onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps(['score', 'total'])
defineEmits(['retry', 'home'])

const percentage = computed(() => (props.score / props.total) * 100)
const circumference = 2 * Math.PI * 70

const dashOffset = computed(() => circumference * (1 - percentage.value / 100))

const ringColor = computed(() => {
    if (percentage.value >= 80) return '#4caf7d'
    if (percentage.value >= 50) return '#f2b84b'
    return '#e2574c'
})

const message = computed(() => {
    if (percentage.value >= 90) return "Exceptionnel ! Un vrai expert."
    if (percentage.value >= 70) return "Très bon score, bien joué !"
    if (percentage.value >= 50) return "Pas mal du tout, continue comme ça."
    return "C'est en retentant qu'on progresse."
})

onMounted(() => {
    if (percentage.value >= 70) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } })
    }
})
</script>

<style scoped>
.score-screen {
    text-align: center;
}

.score-ring-progress {
    transition: stroke-dashoffset 1s ease;
}

.score-ring-text {
    fill: #f3efe6;
    font-size: 1.75rem;
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 700;
}

.score-message {
    margin: 1.5rem 0;
    font-size: 1.1rem;
}

.score-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn-primary,
.btn-secondary {
    padding: 0.75rem 1.75rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
}

.btn-primary {
    background: #f2b84b;
    border: none;
    color: #141a1f;
    font-weight: 600;
}

.btn-secondary {
    background: transparent;
    border: 1px solid #2a333a;
    color: #f3efe6;
}
</style>