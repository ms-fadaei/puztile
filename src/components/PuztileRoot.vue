<template>
  <h1 class="text-2xl font-bold mb-3 text-cool-gray-600 dark:text-cool-gray-400">PUZTILE</h1>
  <TransitionGroup
    tag="div"
    name="list"
    class="wrapper"
    :style="{ 'grid-template-columns': `repeat(${size}, 1fr)` }"
    v-bind="$attrs"
  >
    <div v-for="(tile, index) in puztile" :key="tile.label">
      <button
        class="tile"
        :disabled="isWon"
        :class="{ '!invisible': !tile.label, correct: tile.isCorrect }"
        @click="move(index)"
      >
        {{ tile.label }}
      </button>
    </div>
    <div v-if="isWon" class="won"><span>You Won</span></div>
  </TransitionGroup>
  <PuztileInfo class="mt-2" :movement-count="movementCount" />
  <div class="mt-5">
    <button class="button py-1 px-5" @click="$emit('back')">restart</button>
    <button class="button ml-2 py-1 px-5" :disabled="isWon" @click="restart()">shuffle</button>
  </div>
</template>

<script setup lang="ts">
import { initPuztile } from '~/composables'

interface Props {
  size: number
}

const $props = defineProps<Props>()
const $emit = defineEmits(['back'])
const { isWon, puztile, movementCount, moveWithArrows, move, restart } = initPuztile($props.size)

onMounted(() => {
  document.addEventListener('keydown', moveWithArrows)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', moveWithArrows)
})
</script>

<style scoped>
.list-move {
  transition: all 0.15s cubic-bezier(0.75, -0.25, 0.25, 1.25);
}

.correct {
  position: relative;
}

.correct::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 5px;
  height: 5px;
  background-color: #00d1b2;
  border-radius: 50%;
}
</style>
