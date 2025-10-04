<template>
  <div :class="{ 'dark': darkMode }">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const darkMode = ref(false)

onMounted(() => {
  if (localStorage.getItem('darkMode') === 'true') {
    darkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

