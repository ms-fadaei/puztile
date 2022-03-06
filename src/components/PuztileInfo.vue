<template>
  <div class="text-sm">
    <span>Movements: </span>
    <strong class="text-indigo-500">{{ movementCount }}</strong>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  movementCount: number
}

defineProps<Props>()
</script>
