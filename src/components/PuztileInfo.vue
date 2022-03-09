<template>
  <div class="text-sm">
    <span>Moves: </span>
    <strong class="text-indigo-500">{{ moves }}</strong>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  moves: number
}

defineProps<Props>()
</script>
