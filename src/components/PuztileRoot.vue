<template>
  <div class="mb-3 p-2 rounded-md flex gap-1" un-bg="gray-100 dark:gray-800">
    <button
      class="switch-button"
      :class="{ 'switch-button--active': size === 4 }"
      @click="size = 4"
    >
      small
    </button>
    <button
      class="switch-button"
      :class="{ 'switch-button--active': size === 5 }"
      @click="size = 5"
    >
      normal
    </button>
    <button
      class="switch-button"
      :class="{ 'switch-button--active': size === 6 }"
      @click="size = 6"
    >
      large
    </button>
  </div>
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
        :class="{ '!invisible': !tile.label }"
        @click="move(index)"
      >
        {{ tile.label }}
      </button>
    </div>
  </TransitionGroup>
  <div class="mt-5">
    <button class="restart-button" @click="() => restart()">Restart Game</button>
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
const size = ref($props.size)
const { isWon, puztile, movementCount, moveWithArrows, move, restart } = initPuztile(size.value)

watch(size, (newSize) => {
  console.log(`size changed to ${newSize}`)
  restart(newSize)
})

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
</style>
