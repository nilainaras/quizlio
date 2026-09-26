<template>
    <div class="theme-menu">
        <h1>Quizlio</h1>
        <p>Choisis un thème :</p>
        <button v-for="theme in themes" :key="theme" @click="chooseTheme(theme)">
            {{ theme }}
        </button>
    </div>
</template>

<script setup>
const themes = ['Histoire/Mythologie', 'Science/Tech', 'Informatique', 'Sport', 'Gastronomie']

const emit = defineEmits(['theme-selected'])

function chooseTheme(theme) {
    emit('theme-selected', theme)
}
</script>