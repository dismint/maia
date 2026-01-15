<template>
  <div
    ref="container"
    class="register-container"
    @mousemove="onMouseMove"
  >
    <!-- BIG WEIRD LABEL -->
    <div class="label email-label">
      EMAIL
    </div>
    <input
      v-model="email"
      class="input"
      type="email"
    />

    <!-- EVEN WEIRDER LABEL -->
    <div class="label name-label">
      NAME (OPTIONAL)
    </div>
    <input
      v-model="name"
      class="input"
      type="text"
    />

    <!-- Runaway Create User button -->
    <button
      class="create-btn"
      :style="{ left: button.x + 'px', top: button.y + 'px' }"
      @click="createUser"
    >
      Create User
    </button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'RegisterPlayer',
  setup() {
    const container = ref<HTMLElement | null>(null)

    const email = ref('')
    const name = ref('')

    const button = ref({
      x: 220,
      y: 350,
      width: 160,
      height: 60,
    })

    function createUser() {
      alert(`Email: ${email.value}\nName: ${name.value}`)
    }

    function onMouseMove(event: MouseEvent) {
      if (!container.value) return

      const rect = container.value.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      const dx = button.value.x + button.value.width / 2 - mouseX
      const dy = button.value.y + button.value.height / 2 - mouseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 140) {
        const moveX = (dx / distance) * 70
        const moveY = (dy / distance) * 70

        let newX = button.value.x + moveX
        let newY = button.value.y + moveY

        // wrap around screen
        if (newX < 0) newX = rect.width - button.value.width
        if (newX + button.value.width > rect.width) newX = 0
        if (newY < 0) newY = rect.height - button.value.height
        if (newY + button.value.height > rect.height) newY = 0

        button.value.x = newX
        button.value.y = newY
      }
    }

    return {
      container,
      email,
      name,
      button,
      onMouseMove,
      createUser,
    }
  },
}
</script>

<style scoped>
.register-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #111;
  color: white;
  padding-top: 60px;
}

/* Labels */
.label {
  text-align: center;
  font-weight: 900;
  margin-bottom: 10px;
}

/* DIFFERENT SIZES ON PURPOSE */
.email-label {
  font-size: 72px;
  letter-spacing: 6px;
}

.name-label {
  font-size: 42px;
  letter-spacing: 2px;
  margin-top: 40px;
}

/* Inputs */
.input {
  display: block;
  margin: 0 auto 40px auto;
  width: 360px;
  padding: 14px;
  font-size: 22px;
  background: transparent;
  border: none;
  border-bottom: 4px solid white;
  color: white;
  outline: none;
}

/* Runaway Create button */
.create-btn {
  position: absolute;
  width: 160px;
  height: 60px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 12px;
  border: 2px solid #ccc;
  background: white;
  cursor: pointer;
}
</style>
