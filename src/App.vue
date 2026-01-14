<template>
  <div
    ref="container"
    class="app-container"
    @mousemove="onMouseMove"
  >
    <button
      v-for="(button, index) in buttons"
      :key="index"
      :style="{
        position: 'absolute',
        left: button.x + 'px',
        top: button.y + 'px'
      }"
      @click="handleClick(index)"
    >
      {{ buttonLabels[index] }}
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRunawayButtons } from './useRunawayButtons'

export default {
  setup() {
    const container = ref<HTMLElement | null>(null)
    const { buttons, moveButton } = useRunawayButtons(3)

    const buttonLabels = [
      "Register Player",
      "View Player Stats",
      "Start / Log Game Session"
    ]

    const buttonMessages = [
      "Justin watches ryan constantly.",
      "Justin watching lillia pr0n",
      "Ouid"
    ]

    function handleClick(index: number) {
      alert(buttonMessages[index])
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

    return { buttons, container, onMouseMove, buttonLabels, handleClick }
  },
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

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
</style>
