<template>
  <div class="overflow-x-auto max-w-full flex flex-col gap-1" v-bind="$attrs">
    <div v-for="(puzzleRow, y) in puztile" :key="y" class="flex gap-1">
      <div v-for="(puzzleTile, x) in puzzleRow" :key="x">
        <button class="tile" :disabled="isWon" @click="move(x, y)">
          {{ puzzleTile?.label }}
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
const { isWon, puztile } = initPuztile(props.size)

watch(
  () => puztile.value,
  () => {
    console.log(puztile.value)
  },
  { deep: true }
)

function move(x: number, y: number) {
  let blankTileX = -1
  let blankTileY = -1

  if (x - 1 >= 0 && puztile.value[y][x - 1].label === '') {
    blankTileX = x - 1
    blankTileY = y
  } else if (y - 1 >= 0 && puztile.value[y - 1][x].label === '') {
    blankTileX = x
    blankTileY = y - 1
  } else if (x + 1 < puztile.value[y].length && puztile.value[y][x + 1].label === '') {
    blankTileX = x + 1
    blankTileY = y
  } else if (y + 1 < puztile.value.length && puztile.value[y + 1][x].label === '') {
    blankTileX = x
    blankTileY = y + 1
  }

  if (blankTileX !== -1 && blankTileY !== -1) {
    const tile = puztile.value[y][x]
    puztile.value[y][x] = puztile.value[blankTileY][blankTileX]
    puztile.value[blankTileY][blankTileX] = tile
    tile.isCorrect = tile.correctX === blankTileX && tile.correctY === blankTileY
  }
}
</script>
