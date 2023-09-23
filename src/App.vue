<script setup>
import { onBeforeMount, onMounted, computed } from "vue";
import menu from "@/menu.js";
import Icon from "@/components/Icon.vue";
import { mdiMenu } from '@mdi/js'
import NavBar from "@/components/NavBar.vue";
import NavBarItem from "@/components/NavBarItem.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import AsideRight from "@/components/AsideRight.vue";
import Snackbar from "@/components/Snackbar.vue";
import Overlay from "@/components/Overlay.vue";
import { useRouter } from "vue-router";
import { themeStore } from "./stores/theme";
import { sessionStore } from "./stores/session";

const user = sessionStore();
const theme = themeStore();
const router = useRouter();

const asideSecondaryStyle = computed(() => theme.asideSecondaryStyle);
const isAsideCompact = computed(() => theme.isAsideCompact);

const isAsideVisible = computed(() => theme.isAsideVisible);

const isAsideHiddenLayout = computed(() => theme.isAsideHiddenLayout);

const isAsideMobileExpanded = computed(() => theme.isAsideMobileExpanded);

const isOverlayVisible = computed(
  () => isAsideHiddenLayout.value && isAsideVisible.value
);

const menuClick = (event, item) => {
  if (item.darkModeToggle) {
    theme.darkModeTrigger();
  }

  if (item.menu) {
    theme.asideCompactToggle(false);
  }
};

const menuClose = () => {
  theme.asideVisibilityToggle(false);
};
const overlayClick = () => {
  if (isAsideHiddenLayout.value && isAsideVisible.value) {
    menuClose();
  }
};

onMounted(async () => {
  await user.checkUser();
  if (!user.loggedIn) {
    router.push("login");
  }
});

onBeforeMount(async () => {
  const defaultDocumentTitle = "QSpiders Online";

  /* Collapse mobile aside menu on route change */
  router.beforeEach((to) => {
    theme.asideMobileToggle(false);
    if (theme.isAsideHiddenLayout) {
      theme.asideVisibilityToggle(false);
    }

    theme.formScreenToggle(!!to.meta.formScreen);
  });

  router.afterEach((to) => {
    /* Set document title from route meta */
    if (to.meta && to.meta.title) {
      document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
    } else {
      document.title = defaultDocumentTitle;
    }

    theme.responsiveLayoutControl(!!to.meta.formScreen);
  });
  theme.responsiveLayoutControl();
  window.onresize = () => theme.responsiveLayoutControl();
  theme.setStyle();
  theme.darkModeTrigger();
  await user.checkUser();

  if (!user.loggedIn) {
    router.push("login");
  }
});
</script>
<template>
  <nav-bar />
  <aside-menu
    :menu="menu"
    :class="{
      '-left-60 lg:left-0': !isAsideMobileExpanded,
      'left-0': isAsideMobileExpanded,
      'lg:w-20': isAsideCompact,
    }"
    :label-center="isAsideCompact"
    :compact="isAsideCompact"
    @menu-click="menuClick"
  >
    <nav-bar-item
      v-if="isAsideHiddenLayout"
      color="text-white"
      @click="menuClose"
    >
      <icon :path="mdiMenu" class="cursor-pointer" size="24" />
    </nav-bar-item>
    <div
      class="flex-1"
      :class="{
        'px-3': !isAsideHiddenLayout,
        'flex justify-center': isAsideCompact,
      }"
    >
      <span :class="{ 'lg:hidden': isAsideCompact }">QSpiders </span>
      <b class="font-black">BD Manager</b>
    </div>
  </aside-menu>
  <aside-right />
  <router-view />
  <overlay
    v-show="isOverlayVisible"
    z-index="z-40"
    @overlay-click="overlayClick"
  />
  <snackbar />
</template>


