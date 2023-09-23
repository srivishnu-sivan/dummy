<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import numeral from 'numeral'

const props = defineProps({
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  value: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 500
  }
})

const newValue = ref(0)

const newValueFormatted = computed(
  () => newValue.value < 1000 ? newValue.value : numeral(newValue.value).format('0,0')
)

const value = computed(() => props.value)

const grow = m => {
  const v = Math.ceil(newValue.value + m)

  if (v > value.value) {
    newValue.value = value.value
    return false
  }

  newValue.value = v

  setTimeout(() => {
    grow(m)
  }, 25)
}

const growInit = () => {
  grow(props.value / (props.duration / 25))
}

watch(value, () => {
  growInit()
})

onMounted(() => {
  growInit()
})
</script>

<template>
  <div>{{ prefix }}{{ newValueFormatted }}{{ suffix }}</div>
</template>
