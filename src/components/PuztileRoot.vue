<template>
  <div class="overflow-x-auto max-w-full flex flex-col gap-1" v-bind="$attrs">
    <div v-for="(puzzleRow, y) in puztile" :key="y" class="flex gap-1">
      <div v-for="(puzzleTile, x) in puzzleRow" :key="x">
        <button
          class="tile"
          :disabled="isWon"
          :class="{ '!invisible': !puzzleTile.label }"
          @click="moveTitle(x, y)"
        >
          {{ puzzleTile.label }}
        </button>
      </div>
    </div>
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

const props = defineProps<Props>()
const { isWon, puztile, moveTitle, movementCount } = initPuztile(props.size)

console.log(puztile)
watch(puztile, () => console.log(puztile), { deep: true })
</script>
