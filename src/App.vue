<template>
  <main
    font-sans
    class="flex flex-col h-screen justify-center items-center"
    un-bg="gray-50 dark:gray-900"
    un-text="gray-700 dark:gray-200"
  >
    <h1 class="mb-3 text-cool-gray-600 dark:text-cool-gray-400 text-xl">PUZTILE</h1>
    <PuztileRoot class="p-4 rounded-2" un-bg="gray-100 dark:gray-800" :size="4" />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Puztile',
  meta: [
    {
      name: `description`,
      content: `A simple tile puzzle game.`,
    },
  ],
})
</script>
