<script setup>
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'

const props = defineProps(['question', 'current', 'total'])
const emit = defineEmits(['answered'])
const selected = ref(null)

const shuffledAnswers = computed(() => {
    const all = [...props.question.incorrect_answers, props.question.correct_answer]
    return all.sort(() => Math.random() - 0.5)
})

const progressPct = computed(() => (props.current / props.total) * 100)

const difficultySeverity = computed(() => {
    const map = { facile: 'success', intermediaire: 'info', difficile: 'warn', expert: 'danger' }
    return map[props.question.difficulty] || 'secondary'
})

function selectAnswer(answer) {
    if (selected.value) return
    selected.value = answer
    const isCorrect = answer === props.question.correct_answer
    setTimeout(() => {
        emit('answered', isCorrect)
        selected.value = null
    }, 1000)
}

function answerClass(answer) {
    if (!selected.value) return 'answer-btn'
    if (answer === props.question.correct_answer) return 'answer-btn is-correct'
    if (answer === selected.value) return 'answer-btn is-incorrect'
    return 'answer-btn is-dimmed'
}
</script>

<template>
    <Card class="quiz-card">
        <template #header>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
            </div>
        </template>
        <template #title>
            <div class="question-header">
                <Tag :value="question.difficulty" :severity="difficultySeverity" />
                <span class="question-count">Question {{ current }} / {{ total }}</span>
            </div>
        </template>
        <template #content>
            <h2 class="question-text">{{ question.question }}</h2>
            <div class="answers-grid">
                <button v-for="answer in shuffledAnswers" :key="answer" :class="answerClass(answer)"
                    @click="selectAnswer(answer)">
                    {{ answer }}
                </button>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.quiz-card {
    max-width: 640px;
    width: 100%;
}

.progress-track {
    height: 6px;
    background: #2a333a;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #f2b84b, #f5c654);
    transition: width 0.4s ease;
}

.question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.question-count {
    opacity: 0.7;
    font-size: 0.9rem;
}

.question-text {
    margin: 1rem 0 1.5rem;
}

.answers-grid {
    display: grid;
    gap: 0.75rem;
}

.answer-btn {
    background: #1e262c;
    border: 1px solid #2a333a;
    border-radius: 10px;
    padding: 0.9rem 1.2rem;
    color: #f3efe6;
    text-align: left;
    font-size: 1rem;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
}

.answer-btn:hover {
    border-color: #f2b84b;
}

.answer-btn.is-correct {
    background: #1f3b2c;
    border-color: #4caf7d;
}

.answer-btn.is-incorrect {
    background: #3b2320;
    border-color: #e2574c;
}

.answer-btn.is-dimmed {
    opacity: 0.5;
}
</style>