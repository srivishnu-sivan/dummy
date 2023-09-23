<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: null
  },
  to: {
    type: String,
    default: null
  },
  hasDivider: Boolean,
  desktopIconOnly: Boolean,
  dropdown: Boolean,
  active: Boolean,
  type: {
    type: String,
    default: 'flex'
  },
  pX: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: 'hover:text-blue-500'
  }
})

const is = computed(() => {
  if (props.href) {
    return 'a'
  }

  if (props.to) {
    return 'router-link'
  }

  return 'div'
})

const componentClass = computed(() => {
  const base = [
    props.type,
    'items-center',
    'grow-0',
    'shrink-0',
    'relative',
    props.color,
    'cursor-pointer',
    'hover:text-blue-500',
    props.active ? 'text-blue-600' : 'text-black dark:text-white'
  ]

  if (props.type === 'block') {
    base.push('lg:flex')
  }

  if (!props.dropdown) {
    base.push('py-2', props.pX ?? 'px-3')
  } else {
    base.push('p-0', 'lg:py-2', props.pX ?? 'lg:px-3')
  }

  if (props.hasDivider) {
    base.push('lg:border-r', 'lg:border-gray-100', 'lg:dark:border-gray-800')
  }

  if (props.desktopIconOnly) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base.join(' ')
})

const activeClass = computed(() => {
  return is.value === 'router-link' ? 'text-blue-500' : null
})
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    :to="to"
    :href="href"
    :exact-active-class="activeClass"
  >
    <slot />
  </component>
</template>

<style>
.router-link-active{
  color: #ea893b;
}
</style>