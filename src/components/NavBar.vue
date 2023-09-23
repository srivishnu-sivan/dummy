<script setup>
import { computed, ref } from "vue";
import {
  mdiForwardburger,
  mdiBackburger,
  mdiClose,
  mdiDotsVertical,
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiOfficeBuilding,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiHelpCircleOutline,
  mdiBell,
  mdiThemeLightDark,
  mdiLifebuoy,
  mdiShapeSquarePlus,
  mdiAccount,
} from "@mdi/js";

import ModalBox from "@/components/ModalBox.vue";
import LogoutBox from "@/components/LogoutBox.vue";
import JbButtons from "@/components/JbButtons.vue";
import JbButton from "@/components/JbButton.vue";
import TextLink from "@/components/TextLink.vue";
import Level from "@/components/Level.vue";
import Changepw from "@/components/Changepw.vue";
import NavBarItem from "@/components/NavBarItem.vue";
import NavBarItemLabel from "@/components/NavBarItemLabel.vue";
import NavBarMenu from "@/components/NavBarMenu.vue";
import Divider from "@/components/Divider.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import Icon from "@/components/Icon.vue";
import NavBarSearch from "@/components/NavBarSearch.vue";
import { themeStore } from "../stores/theme";
import { sessionStore } from "../stores/session";

import { useRouter } from "vue-router";

const router = useRouter();

const theme = themeStore();
const user = sessionStore();
const isAsideRightActive = computed(() => theme.isAsideRightActive);

const isNavBarVisible = computed(() => !theme.isFormScreen);

const isAsideMobileExpanded = computed(() => theme.isAsideMobileExpanded);

const isAsideCompact = computed(() => theme.isAsideCompact);

const isAsideHiddenLayout = computed(() => theme.isAsideHiddenLayout);

const userName = computed(() => {
  if (user.user) {
    return user.user.name;
  }
});

const menuToggleMobileIcon = computed(() =>
  isAsideMobileExpanded.value ? mdiBackburger : mdiForwardburger
);

const menuToggleMobile = () => theme.asideMobileToggle();

const menuToggleIcon = computed(() => {
  if (isAsideHiddenLayout.value) {
    return mdiMenu;
  }

  return isAsideCompact.value ? mdiForwardburger : mdiBackburger;
});

const menuToggle = () => {
  if (isAsideHiddenLayout.value) {
    theme.asideVisibilityToggle();
  } else {
    theme.asideCompactToggle();
  }
};

const asideRightToggle = () => {
  updatesClicked.value = true;
  theme.asideRightToggle();
};

const isMenuNavBarActive = ref(false);

const modalOneActive = ref(false);
const changepw = ref(false);

const menuNavBarToggleIcon = computed(() =>
  isMenuNavBarActive.value ? mdiClose : mdiDotsVertical
);

const menuNavBarToggle = () => {
  isMenuNavBarActive.value = !isMenuNavBarActive.value;
};

const updatesClicked = ref(false);

const updatesUpdateMark = computed(() =>
  !updatesClicked.value && theme.updatesStatus ? "warning" : null
);

const toggleLightDark = () => {
  theme.darkModeTrigger();
};
</script>

<template>
  <nav
    v-show="isNavBarVisible"
    id="nav"
    class="fixed top-0 left-0 right-0 z-30 flex h-14 w-screen border-b border-gray-100 bg-white transition-position dark:border-gray-800 dark:bg-gray-900 lg:w-auto lg:items-stretch lg:transition-none"
  >
    <logout-box
      v-model="modalOneActive"
      large-title="Logout"
      button="danger"
      has-cancel
    />
    <Changepw
      v-model="changepw"
      large-title="Reset Password"
      button="info"
      has-cancel
    />

    <div class="flex h-14 flex-1 items-stretch">
      <nav-bar-item
        type="flex lg:hidden"
        p-x="pl-3 pr-0"
        @click.prevent="menuToggleMobile"
      >
        <icon :path="menuToggleMobileIcon" size="24" />
      </nav-bar-item>
      <nav-bar-item
        type="hidden lg:flex"
        p-x="pl-3 pr-0"
        @click.prevent="menuToggle"
      >
        <icon :path="menuToggleIcon" size="24" />
      </nav-bar-item>
      <!-- <nav-bar-item type="hidden lg:flex">
        <nav-bar-search />
      </nav-bar-item> -->
    </div>
    <div class="flex h-14 flex-none items-stretch lg:hidden">
      <nav-bar-item :active="isAsideRightActive">
        <!-- @click="asideRightToggle" -->
        <icon :path="mdiBell" :update-mark="updatesUpdateMark" size="20" />
      </nav-bar-item>
      <nav-bar-item @click.prevent="menuNavBarToggle">
        <icon :path="menuNavBarToggleIcon" size="20" />
      </nav-bar-item>
    </div>
    <div
      class="absolute top-14 left-0 w-screen bg-white shadow dark:bg-gray-900 lg:static lg:flex lg:w-auto lg:grow lg:items-stretch lg:overflow-visible lg:border-b-0 lg:shadow-none"
      :class="{ hidden: !isMenuNavBarActive, block: isMenuNavBarActive }"
    >
      <div
        class="max-h-screen-menu overflow-y-auto lg:ml-auto lg:flex lg:items-stretch lg:justify-end lg:overflow-visible"
      >
        <!-- <nav-bar-menu has-divider>
          <nav-bar-item-label :icon="mdiMenu" label="Sample menu" />

          <template #dropdown>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiClockOutline" label="Item One" />
            </nav-bar-item>
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiCloud" label="Item Two" />
            </nav-bar-item>
            <divider nav-bar />
            <nav-bar-item>
              <nav-bar-item-label :icon="mdiCrop" label="Item Last" />
            </nav-bar-item>
          </template>
        </nav-bar-menu> -->

        <nav-bar-item to="/comp-form" has-divider>
          <!-- <small class="text-gray-500 dark:text-gray-300">
            <jb-button
              color="orange"
              :icon="mdiShapeSquarePlus"
              label="New Company"
              small
            />
          </small> -->
        </nav-bar-item>

        <nav-bar-menu has-divider>
          <div>
            <span>{{ userName }}</span>
          </div>

          <template #dropdown>
            <!-- <nav-bar-item to="/company-list">
              <nav-bar-item-label :icon="mdiOfficeBuilding" label="Companies" />
            </nav-bar-item> -->

            <nav-bar-item @click="changepw = true">
              <nav-bar-item-label :icon="mdiAccount" label="Reset Password" />
            </nav-bar-item>
            <divider nav-bar />
            <nav-bar-item @click="modalOneActive = true">
              <nav-bar-item-label :icon="mdiLogout" label="Log Out" />
            </nav-bar-item>
          </template>
        </nav-bar-menu>
        <!-- <nav-bar-item href="#" has-divider desktop-icon-only>
          <nav-bar-item-label
            :icon="mdiHelpCircleOutline"
            label="About"
            desktop-icon-only
          />
        </nav-bar-item> -->
        <!-- <nav-bar-item
          :active="isAsideRightActive"
          has-divider
          desktop-icon-only
        >
          @click="asideRightToggle"
          <nav-bar-item-label
            :icon="mdiBell"
            :update-mark="updatesUpdateMark"
            label="Updates"
            desktop-icon-only
          />
        </nav-bar-item> -->
        <nav-bar-item desktop-icon-only @click="modalOneActive = true">
          <nav-bar-item-label
            :icon="mdiLogout"
            label="Log out"
            desktop-icon-only
          />
        </nav-bar-item>
      </div>
    </div>
  </nav>
</template>
