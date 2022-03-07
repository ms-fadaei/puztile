<template>
  <div class="normal-bg flex gap-1">
    <button
      v-for="s in supportedSizes"
      :key="s.value"
      class="switch-button"
      :class="{ 'text-blue-gray-50': size === s.value, [s.class]: size === s.value }"
      @click="size = s.value"
    >
      {{ s.label }}
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

const supportedSizes = [
  {
    label: 'Small',
    value: 4,
    class: 'bg-green-600',
  },
  {
    label: 'Medium',
    value: 5,
    class: 'bg-orange-500',
  },
  {
    label: 'Large',
    value: 6,
    class: 'bg-red-500',
  },
]
</script>
