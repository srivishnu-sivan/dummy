<script setup>
import { computed } from 'vue'
//import { useStore } from 'vuex'
import CardComponent from '@/components/CardComponent.vue'
import GrowingNumber from '@/components/GrowingNumber.vue'
import Icon from '@/components/Icon.vue'
import Level from '@/components/Level.vue'
import TrendBox from '@/components/TrendBox.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  number: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  }
})


const smaller = computed(() => theme.isMd && !theme.isLg)
</script>

<template>
  <card-component v-bind="$attrs" :smaller-padding="smaller" class="mx-6 md:mx-0 rounded">
    <trend-box v-if="trend" :trend="trend" :trend-type="trendType" />
    <level mobile>
      <div>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-gray-400">{{ label }}</h3>
        <h1 class="text-3xl leading-tight font-semibold">
          <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
        </h1>
      </div>
      <icon v-if="icon" :path="icon" size="48" w h="h-16" :class="color" />
    </level>
  </card-component>
</template>
