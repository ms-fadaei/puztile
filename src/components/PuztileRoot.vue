<template>
  <TransitionGroup
    tag="div"
    name="list"
    class="wrapper"
    :style="{ 'grid-template-columns': `repeat(${size}, minmax(0, 1fr))` }"
    v-bind="$attrs"
  >
    <div v-for="(tile, index) in puztile" :key="tile.label">
      <button
        class="tile"
        :disabled="isWon"
        :class="{ '!invisible': !tile.label }"
        @click="move(index)"
      >
        {{ tile.label }}
      </button>
    </div>
  </TransitionGroup>
  <div class="mt-5">
    <button class="restart-button" @click="restart">Restart Game</button>
  </div>
  <div class="mt-5">
    <div>
      <span>Game Status: </span>
      <strong v-if="isWon" class="text-emerald-600">You Won!</strong>
      <strong v-else class="text-pink-500">Playing</strong>
    </div>
    <div class="mt-1">
      <span>Movements: </span>
      <strong class="text-indigo-500">{{ movementCount }}</strong>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initPuztile } from '~/composables'

interface Props {
  size: number
}

const $props = defineProps<Props>()
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
  transition: all 0.25s ease;
}
</style>
