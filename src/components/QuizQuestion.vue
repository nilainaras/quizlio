<template>
    <div class="quiz-question">
        <span class="badge">{{ question.difficulty }}</span>
        <h2>{{ question.question }}</h2>
        <button v-for="answer in shuffledAnswers" :key="answer" :class="answerClass(answer)"
            @click="selectAnswer(answer)">
            {{ answer }}
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['question'])
const emit = defineEmits(['answered'])

const selected = ref(null)

const shuffledAnswers = computed(() => {
    const all = [...props.question.incorrect_answers, props.question.correct_answer]
    return all.sort(() => Math.random() - 0.5)
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
    if (!selected.value) return ''
    if (answer === props.question.correct_answer) return 'correct'
    if (answer === selected.value) return 'incorrect'
    return ''
}
</script>