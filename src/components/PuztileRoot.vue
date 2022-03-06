<template>
  <PuztileSize v-model="size" class="mb-3" />
  <TransitionGroup
    tag="div"
    name="list"
    class="wrapper grid-cols-4"
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
  </TransitionGroup>
  <PuztileRestart class="mt-5" @restart="restart" />
  <PuztileInfo class="mt-5" :is-won="isWon" :movement-count="movementCount" />
</template>

<script setup lang="ts">
import { initPuztile } from '~/composables'

interface Props {
  size: number
}

const $props = defineProps<Props>()
const size = ref($props.size)
const { isWon, puztile, movementCount, moveWithArrows, move, restart } = initPuztile(size.value)

// restart game with new size
watch(size, restart)

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
