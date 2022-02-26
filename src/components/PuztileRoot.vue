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
  <div v-if="isWon" class="mt-3 text-emerald-600">
    <strong>You Won!</strong>
  </div>
</template>

<script setup lang="ts">
import { initPuztile } from '~/composables'

interface Props {
  size: number
}

const props = defineProps<Props>()
const { isWon, puztile, moveTitle } = initPuztile(props.size)

console.log(puztile)
watch(puztile, () => console.log(puztile), { deep: true })
</script>
