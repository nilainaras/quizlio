<template>
  <div class="app-shell app-dark">
    <main class="app-main">
      <ThemeMenu v-if="isLoading === false && !quiz && !isFinished" @theme-selected="handleThemeChoice" />

      <div v-else-if="isLoading" class="loading-screen">
        <ProgressSpinner strokeWidth="4" />
        <p>Génération de ton quiz en cours...</p>
      </div>

      <QuizQuestion v-else-if="quiz && !isFinished" :key="currentIndex" :question="quiz[currentIndex]"
        :current="currentIndex + 1" :total="quiz.length" @answered="handleAnswered" />

      <ScoreScreen v-else-if="isFinished" :score="score" :total="quiz.length" @retry="retry" @home="goHome" />

      <p v-if="error" class="error-message">{{ error }}</p>
    </main>

    <footer class="app-footer">© Nilaina Ras</footer>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import ThemeMenu from './components/ThemeMenu.vue'
import QuizQuestion from './components/QuizQuestion.vue'
import ScoreScreen from './components/ScoreScreen.vue'
import ProgressSpinner from 'primevue/progressspinner'
import { generateQuiz } from './services/gemini.js'

const quiz = ref(null)
const isLoading = ref(false)
const error = ref(null)
const currentIndex = ref(0)
const score = ref(0)
const isFinished = ref(false)
const currentTheme = ref(null)

async function runQuiz(theme) {
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

function handleThemeChoice(theme) {
  currentTheme.value = theme
  runQuiz(theme)
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
  runQuiz(currentTheme.value)
}

function goHome() {
  quiz.value = null
  isFinished.value = false
  currentTheme.value = null
}
</script>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-screen {
  text-align: center;
}

.loading-screen p {
  margin-top: 1rem;
  opacity: 0.8;
}

.error-message {
  color: #e2574c;
  margin-top: 1rem;
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  opacity: 0.5;
  font-size: 0.85rem;
}
</style>