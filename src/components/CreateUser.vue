<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const name = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

async function submit() {
  error.value = null
  success.value = false
  loading.value = true

  try {
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email.value,
            name: name.value || null
        })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to create user')
    }

    email.value = ''
    name.value = ''
    success.value = true
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>

    <div>
      <label>Name (optional)</label>
      <input v-model="name" type="text" />
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Creating...' : 'Create User' }}
    </button>

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">User created!</p>
  </form>
</template>
