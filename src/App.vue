<template>
  <!-- Landing page with runaway buttons -->
  <div v-if="isLandingPage" ref="container" class="app-container" @mousemove="onMouseMove">
    <button
      v-for="(button, index) in buttons"
      :key="index"
      :style="{ position: 'absolute', left: button.x + 'px', top: button.y + 'px' }"
      @click="handleClick(index)"
    >
      {{ buttonLabels[index] }}
    </button>
  </div>

  <!-- Router content for other pages -->
  <div v-else class="router-container">
    <button class="back-btn" @click="goBack">Back</button>
    <div class="page-text">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useRunawayButtons } from './useRunawayButtons'
import { useRouter, useRoute, RouterView } from 'vue-router'

export default {
  setup() {
    const container = ref<HTMLElement | null>(null)
    const { buttons, moveButton } = useRunawayButtons(3)
    const router = useRouter()
    const route = useRoute()

    const buttonLabels = [
      "Register Player",
      "View Player Stats",
      "Start / Log Game Session"
    ]

    const buttonRoutes = [
      '/register-player',
      '/view-player-stats',
      '/start-log-game-session'
    ]

    const isLandingPage = computed(() => route.path === '/')

    function handleClick(index: number) {
      router.push(buttonRoutes[index])
    }

    function goBack() {
      router.push('/')
    }

    function onMouseMove(event: MouseEvent) {
      if (!container.value) return
      const rect = container.value.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      buttons.value.forEach((_, i) => {
        moveButton(i, mouseX, mouseY, rect.width, rect.height)
      })
    }

    return {
      buttons,
      container,
      onMouseMove,
      buttonLabels,
      handleClick,
      goBack,
      isLandingPage
    }
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-family: sans-serif;
}

.app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

/* Mahjong tile buttons */
button {
  cursor: pointer;
  transition: left 0.05s, top 0.05s;
  width: 120px;
  height: 180px;
  border-radius: 12px;
  border: 2px solid #ccc;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Back button (small) */
.back-btn {
  display: inline-block;
  margin-bottom: 30px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #333;
  background-color: #eee;
}

/* Router container */
.router-container {
  position: relative;
  z-index: 10;
  margin: 40px;
  text-align: center;
}

/* Huge page text */
.page-text {
  font-size: 80px; /* really big text */
  font-weight: bold;
  line-height: 1.2;
  margin-top: 20px;
}
</style>
