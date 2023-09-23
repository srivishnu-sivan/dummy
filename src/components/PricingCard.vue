<script setup>
import { mdiCheck } from '@mdi/js'
//import { useStore } from 'vuex'
import { computed } from 'vue'
import CardComponent from '@/components/CardComponent.vue'
import JbButtons from '@/components/JbButtons.vue'
import JbButton from '@/components/JbButton.vue'
import Pill from '@/components/Pill.vue'
import Level from '@/components/Level.vue'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

defineProps({
  item: {
    type: Object,
    required: true,
    validator: value => (value.title && value.subTitle)
  },
  price: {
    type: [String, Number],
    required: true
  },
  period: {
    type: String,
    required: true
  },
  main: Boolean
})

const darkMode = computed(() => theme.darkMode)
</script>

<template>
  <card-component
    :class="[main ? 'shadow-2xl' : 'lg:my-12']"
    rounded="rounded-lg"
    :collapsible="!main"
    collapsed-class="hidden lg:block"
    collapsible-header-class
  >
    <template #header="props">
      <level mobile>
        <div>
          <level type="justify-end" mobile>
            <h3 class="text-4xl">$</h3>
            <h1 class="text-5xl font-black">{{ price }}</h1>
            <h1 class="text-xl text-gray-500 dark:text-gray-400">/{{ period }}</h1>
          </level>
          <pill :text="item.label" :type="item.labelType" :outline="darkMode" small />
        </div>

        <level mobile>
          <div class="text-right">
            <h1 class="text-2xl">{{ item.title }}</h1>
            <h1 class="text-lg text-gray-500 dark:text-gray-400">{{ item.subTitle }}</h1>
          </div>
          <icon
            v-if="props.icon"
            :path="props.icon"
            size="48"
            w="w-16"
            h="h-16"
            class="ml-6 lg:hidden"
          />
        </level>
      </level>
    </template>

    <div class="space-y-6">
      <div v-for="(option, index) in item.options" :key="index" class="flex items-center">
        <icon :path="mdiCheck" size="24" w="w-8" h="h-8" />
        <span class="text-lg ml-3">
          <b>{{ option.main }}</b>
          {{ option.sub }}
        </span>
      </div>
    </div>

    <template #footer>
      <jb-buttons>
        <jb-button class="flex-1" color="info" label="Subscribe" :outline="!main" />
      </jb-buttons>
    </template>
  </card-component>
</template>
