<template>
  <ThemeMenu v-if="!quiz && !isLoading" @theme-selected="handleThemeChoice" />
  <p v-if="isLoading">Génération du quiz en cours...</p>
  <p v-if="error">{{ error }}</p>

  <QuizQuestion v-if="quiz && !isFinished" :question="quiz[currentIndex]" @answered="handleAnswered" />

  <div v-if="isFinished">
    <h2>Score : {{ score }} / 20</h2>
    <button @click="retry">Réessayer</button>
    <button @click="retry">Quitter</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ThemeMenu from './components/ThemeMenu.vue'
import QuizQuestion from './components/QuizQuestion.vue'
import { generateQuiz } from './services/gemini.js'

const quiz = ref(null)
const isLoading = ref(false)
const error = ref(null)
const currentIndex = ref(0)
const score = ref(0)
const isFinished = ref(false)

async function handleThemeChoice(theme) {
  isLoading.value = true
  error.value = null

  try {
    quiz.value = await generateQuiz(theme)
    currentIndex.value = 0
    score.value = 0
    isFinished.value = false
  } catch (err) {
    error.value = "Une erreur est survenue, réessaie."
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function handleAnswered(isCorrect) {
  if (isCorrect) score.value++

  if (currentIndex.value < quiz.value.length - 1) {
    currentIndex.value++
  } else {
    isFinished.value = true
  }
}

function retry() {
  quiz.value = null
  isFinished.value = false
}
</script>