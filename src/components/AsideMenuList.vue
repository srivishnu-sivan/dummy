<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { ref } from 'vue'

defineProps({
  isSubmenuList: Boolean,
  compact: Boolean,
  menu: {
    type: Array,
    default: () => []
  }
})
const menuTitle = ref(["Company List",
"Company Details List",
"Requirement-List",
"Pool List",
"Client Requirement List",
"Create Ratings",
"Script List",
"Points List",
"Category Form",
"Category Table",])
const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}
</script>

<template>
  <ul>
    <aside-menu-item
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-submenu-list="isSubmenuList"
      :compact="compact"
      @menu-click="menuClick"
      :title="menuTitle[index]"
    />
  </ul>
</template>
