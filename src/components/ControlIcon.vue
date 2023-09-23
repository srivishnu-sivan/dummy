<script setup>
import Icon from '@/components/Icon.vue'

defineProps({
  icon: {
    type: String,
    default: null
  },
  h: {
    type: String,
    default: null
  },
  isRight: Boolean,
  clickable: Boolean,
  textColor: {
    type: String,
    default: 'text-gray-500'
  }
})

const emit = defineEmits(['icon-click'])

const iconClick = e => {
  emit('icon-click', e)
}
</script>

<template>
<!-- :h="h" -->
  <icon
    :path="icon"
    w="w-10"
    h="h-8"
    class="absolute top-0 z-10"
    :class="[
      isRight ? 'right-0' : 'left-0',
      clickable ? 'cursor-pointer' : 'pointer-events-none',
      textColor
    ]"
    @click.prevent="iconClick"
  />
</template>
