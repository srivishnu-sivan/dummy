<script setup>
import { computed } from 'vue'
import AsideMenuList from '@/components/AsideMenuList.vue'
import { themeStore } from "../stores/theme"
const theme = themeStore();

const props = defineProps({
  menu: {
    type: Array,
    default: () => []
  },
  menuBottom: {
    type: Array,
    default: () => []
  },
  zIndex: {
    type: String,
    default: 'z-50'
  },
  labelCenter: Boolean,
  compact: Boolean
})

const emit = defineEmits(['menu-click'])


const isAsideVisible = computed(() => theme.isAsideVisible)

const asideClassList = computed(() => [props.zIndex, theme.asideStyle])

const asideBrandStyle = computed(() => theme.asideBrandStyle)

const asideMenuLabelStyle = computed(() => theme.asideMenuLabelStyle)

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}
</script>

<template>
  <aside
    v-show="isAsideVisible"
    id="aside"
    class="flex flex-col w-60 h-screen top-0 fixed transition-position dark:bg-gray-900/70 dark:shadow-r-gray-800"
    :class="asideClassList"
  >
    <div
      class="flex flex-row w-full shrink-0 h-14 items-center"
      :class="[asideBrandStyle, { 'lg:justify-center': labelCenter }]"
    >
      <slot />
    </div>
    <div class="flex-1">
      <template v-for="(menuGroup, index) in menu">
        <p
          v-if="typeof menuGroup === 'string'"
          :key="`h-${index}`"
          class="p-3 text-xs uppercase"
          :class="[asideMenuLabelStyle, { 'lg:hidden': compact }]"
        >{{ menuGroup }}</p>
        <aside-menu-list
          v-else
          :key="`m-${index}`"
          :menu="menuGroup"
          :compact="compact"
          @menu-click="menuClick"
        />
      </template>
    </div>

    <aside-menu-list :menu="menuBottom" :compact="compact" @menu-click="menuClick" />
  </aside>
</template>
