<template>
  <div class="p-2 rounded-md flex gap-1" un-bg="gray-100 dark:gray-800">
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
</template>

<script lang="ts" setup>
interface Props {
  modelValue: number
}

const $props = defineProps<Props>()
const $emit = defineEmits(['update:modelValue'])

const size = computed({
  set(value: number) {
    $emit('update:modelValue', value)
  },
  get() {
    return $props.modelValue
  },
})
</script>
