<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 text-gray-800">
    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 class="text-5xl md:text-6xl font-bold mb-6">
        Mahjong, Reimagined
      </h1>
      <p class="text-xl md:text-2xl mb-10 text-gray-600">
        Play classic Mahjong with modern design, smooth animations, and friends anywhere.
      </p>

      <div class="flex justify-center gap-4">
        <nav>
          <RouterLink to="/">Go to Home</RouterLink>
          <RouterLink to="/about">Go to About</RouterLink>
        </nav>
        <main>
          <RouterView />
        </main>
      </div>
    </section>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
