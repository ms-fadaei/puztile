<template>
  <main
    font-sans
    class="flex flex-col h-screen justify-center items-center"
    un-bg="slate-50 dark:slate-900"
    un-text="gray-700 dark:gray-200"
  >
    <Intro v-if="step === 0" v-model="size" @start="step = 1" />
    <Puztile v-else class="normal-bg" :size="size" @back="step = 0" />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

const step = ref(0)
const size = ref(4)

useHead({
  title: 'Puztile: tile puzzle game',
  meta: [
    {
      name: `description`,
      content: `Enjoyable tile puzzle game.`,
    },
  ],
})
</script>
