<template>
  <div>
    <button class="restart-button" @click="restart">Restart Game</button>
  </div>
</template>

<script lang="ts" setup>
const $emit = defineEmits(['restart'])
const restart = () => $emit('restart')
</script>
