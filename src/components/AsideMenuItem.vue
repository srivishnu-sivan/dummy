<script setup>
import { ref, computed, watch } from "vue";
//import { useStore } from 'vuex'
import { mdiMinus, mdiPlus, mdiChevronRight } from "@mdi/js";
import { getButtonColor } from "@/colors.js";
import Icon from "@/components/Icon.vue";
import AsideMenuList from "@/components/AsideMenuList.vue";
import { themeStore } from "../stores/theme";
const theme = themeStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isSubmenuList: Boolean,
  compact: Boolean,
});

const emit = defineEmits(["menu-click"]);

// const asideMenuItemStyle = computed(() => theme.asideMenuItemStyle)

// if (!hasColor.value && (isDropdownActive.value || isSecondaryMenuActive.value)) {

const asideMenuItemActiveStyle = computed(() => theme.asideMenuItemActiveStyle);

const asideMenuItemInactiveStyle = computed(
  () => theme.asideMenuItemInactiveStyle
);

const asideSubmenuListStyle = computed(() => theme.asideSubmenuListStyle);

const isAsideCompact = computed(() => theme.isAsideCompact);

watch(isAsideCompact, (value) => {
  if (value) {
    isDropdownActive.value = false;
  }
});

const isDropdownActive = ref(false);

const isSecondaryMenuActive = computed(
  () =>
    secondaryMenu.value &&
    props.item &&
    props.item.key === secondaryMenu.value.key
);

const secondaryMenu = computed(() => theme.secondaryMenu);

const hasColor = computed(() => props.item && props.item.color);

// const activeClass = 'bg-gray-700/70 dark:bg-gray-700/40'

const componentClass = computed(() => {
  const base = [
    props.isSubmenuList ? "p-3 text-sm" : "py-2",
    hasColor.value
      ? getButtonColor(props.item.color, false, true)
      : theme.asideMenuItemStyle,
    // : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-700/50'
  ];

  if (
    !hasColor.value &&
    (isDropdownActive.value || isSecondaryMenuActive.value)
  ) {
    base.push(theme.asideMenuItemActiveBgStyle);
  }

  return base;
});

const exactActiveClass = computed(() =>
  secondaryMenu.value ? null : theme.asideMenuItemActiveBgStyle
);

const componentIs = computed(() => (props.item.to ? "router-link" : "a"));

const hasDropdown = computed(() => !!props.item.menu);

const hasSecondary = computed(() => !!props.item.menuSecondary);

const hasSub = computed(() => hasDropdown.value || hasSecondary.value);

const subIcon = computed(() => {
  if (hasSecondary.value) {
    return mdiChevronRight;
  }

  return isDropdownActive.value ? mdiMinus : mdiPlus;
});

const itemTo = computed(() => props.item.to || null);

const itemHref = computed(() => props.item.href || null);

const itemTarget = computed(() =>
  componentIs.value === "a" && props.item.target ? props.item.target : null
);

const menuClick = (event) => {
  emit("menu-click", event, props.item);

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value;
  }
};

const menuIconWidth = computed(() => (props.compact ? "w-12 lg:w-20" : "w-12"));

const updateMarkTr = computed(() => {
  const base = "top-0 right-2";

  return props.compact ? `${base} lg:right-6` : base;
});
</script>

<template>
  <li>
    <component
      :is="componentIs"
      v-slot="vSlot"
      :to="itemTo"
      :href="itemHref"
      :target="itemTarget"
      :exact-active-class="exactActiveClass"
      class="flex cursor-pointer"
      :class="componentClass"
      @click="menuClick"
    >
      <icon
        v-if="item.icon"
        :path="item.icon"
        :update-mark="item.updateMark ?? null"
        :update-mark-tr="updateMarkTr"
        :size="20"
        class="flex-none"
        :class="[
          vSlot && vSlot.isExactActive
            ? asideMenuItemActiveStyle
            : asideMenuItemInactiveStyle,
        ]"
        :w="menuIconWidth"
      />
      <span
        class="grow"
        :class="[
          { 'lg:hidden': compact },
          vSlot && vSlot.isExactActive
            ? asideMenuItemActiveStyle
            : asideMenuItemInactiveStyle,
        ]"
        >{{ item.label }}</span
      >
      <icon
        v-if="hasSub"
        :path="subIcon"
        class="flex-none"
        :class="[
          { 'lg:hidden': compact },
          vSlot && vSlot.isExactActive
            ? asideMenuItemActiveStyle
            : asideMenuItemInactiveStyle,
        ]"
        w="w-12"
      />
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :class="[
        asideSubmenuListStyle,
        isDropdownActive ? 'block dark:bg-gray-800/50' : 'hidden',
      ]"
      is-submenu-list
    />
  </li>
</template>
