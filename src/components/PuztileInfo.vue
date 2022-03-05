<template>
  <div>
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

<script lang="ts" setup>
interface Props {
  isWon: boolean
  movementCount: number
}

defineProps<Props>()
</script>
