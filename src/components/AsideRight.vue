<script setup>
import { computed } from 'vue'
// import { mdiInformation } from '@mdi/js'
import Icon from '@/components/Icon.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();



const isAsideRightActive = computed(() => theme.isAsideRightActive)

const items = computed(() => theme.updates)
</script>

<template>
  <aside
    id="aside-right"
    class="w-60 pr-1.5 fixed z-40 h-screen lg:h-screen-menu top-0 lg:top-14 bg-white border-l border-gray-100 overflow-y-scroll transition-position dark:bg-gray-900 dark:border-gray-700 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
    :class="{ 'right-0': isAsideRightActive, '-right-60': !isAsideRightActive }"
  >
    <div>
      <div
        v-for="item in items"
        :key="item.id"
        class="p-6 border-b border-gray-100 last:border-b-0 dark:border-gray-700"
      >
        <div class="mb-3">{{ item.text }}</div>
        <div class="flex justify-start">
          <div
            class="inline-flex rounded-sm text-white"
            :class="{
              'bg-emerald-500': item.status === 'success',
              'bg-blue-500': item.status === 'info',
              'bg-yellow-500': item.status === 'warning',
              'bg-red-500': item.status === 'danger'
            }"
          >
            <icon :path="mdiInformation" />
          </div>
          <div class="text-sm text-gray-500 ml-3 dark:text-gray-400">{{ item.ago }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>
