<script setup>
import { controlTextColor, getButtonColor } from "@/colors.js";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import {
  mdiUnfoldMoreHorizontal,
  mdiAlertCircle,
  mdiCheckCircle,
  mdiAsterisk,
  mdiLockOff,
} from "@mdi/js";
import ControlIcon from "@/components/ControlIcon.vue";
import FieldHelp from "@/components/FieldHelp.vue";
import ListBoxUi from "@/components/ListBoxUi.vue";
import Icon from "@/components/Icon.vue";
import Tip from "@/components/Tip.vue";
import { themeStore } from "../stores/theme";
const theme = themeStore();

const props = defineProps({
  firstAddon: Boolean,
  middleAddon: Boolean,
  lastAddon: Boolean,
  expanded: Boolean,
  inputW: {
    type: String,
    default: "w-full",
  },
  help: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  required: Boolean,
  autocomplete: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  iconLeft: {
    type: String,
    default: null,
  },
  iconRight: {
    type: String,
    default: null,
  },
  error: {
    type: [Boolean, String],
    default: null,
  },
  success: {
    type: [Boolean, String],
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  minDate: {
    type: String,
    default: "",
  },
  maxDate: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object, Boolean],
    default: "",
  },
  buttonLabel: {
    type: String,
    default: null,
  },
  buttonIcon: {
    type: String,
    default: null,
  },
  buttonColor: {
    type: String,
    default: "white",
  },
  buttonOutline: Boolean,
  borderless: Boolean,
  tipLeft: {
    type: String,
    default: null,
  },
  tipRight: {
    type: String,
    default: null,
  },
  ctrlKFocus: Boolean,
  readonly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:modelValue", "right-icon-click"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const borderColor = computed(() => {
  if (props.error) {
    return "border-red-600";
  }

  if (props.success) {
    return "border-emerald-600";
  }

  return "border-gray-700";
});

const textColor = computed(() => {
  return controlTextColor(props.error, props.success);
});

const placeholderColor = computed(() => {
  if (props.error) {
    return "placeholder-red-600";
  }

  if (props.success) {
    return "placeholder-emerald-600";
  }

  return null;
});

const wrapperBorder = computed(
  () => ["textarea"].indexOf(computedType.value) < 0
);

const upperWrapperClass = computed(() => (props.expanded ? "grow shrink" : ""));

const wrapperClass = computed(() => {
  const base = [];

  if (computedType.value === "button") {
    base.push(getButtonColor(props.buttonColor, props.buttonOutline, true));
  } else {
    base.push(borderColor.value);

    if (wrapperBorder.value) {
      base.push("dark:bg-gray-800");
    }
  }

  if (!props.borderless && wrapperBorder.value) {
    base.push("border-t border-b");

    if (!props.firstAddon && !props.lastAddon && !props.middleAddon) {
      base.push("rounded border-l border-r");
    } else if (props.firstAddon) {
      base.push("rounded-l border-l");

      if (computedType.value !== "button") {
        base.push("pr-1");
      }
    } else if (props.lastAddon) {
      base.push("rounded-r border-r");

      if (computedType.value !== "button") {
        base.push("pl-1");
      }
    }
  }

  return base;
});

const inputElClass = computed(() => {
  const base = [
    "max-w-full focus:ring focus:outline-none dark:placeholder-gray-400",
    props.inputW,
    computedType.value === "textarea" ? "h-24" : "h-10",
    props.borderless || wrapperBorder.value ? "border-0" : "border",
  ];

  if (computedType.value === "button") {
    base.push(getButtonColor(props.buttonColor, props.buttonOutline, true));
  } else {
    base.push(borderColor.value, "dark:bg-gray-800");
  }

  if (textColor.value) {
    base.push(textColor.value);
  }

  if (placeholderColor.value) {
    base.push(placeholderColor.value);
  }

  if (!props.firstAddon && !props.lastAddon && !props.middleAddon) {
    base.push("rounded");
  } else if (props.firstAddon) {
    base.push("rounded-l");
  } else if (props.lastAddon) {
    base.push("rounded-r");
  }

  if (computedIconLeft.value) {
    base.push("pl-10");
  }

  if (computedIconRight.value) {
    base.push("pr-10");
  }

  return base;
});

const computedType = computed(() => {
  if (props.options && props.type !== "list") {
    return "select";
  }

  if (props.buttonLabel || props.buttonIcon) {
    return "button";
  }

  if (props.type === "password" && passwordIsOpen.value) {
    return "text";
  }

  return props.type;
});

const computedIconLeft = computed(() => props.iconLeft ?? null);

const computedIconRight = computed(() => {
  if (props.error) {
    return mdiAlertCircle;
  }

  if (props.success) {
    return mdiCheckCircle;
  }

  if (props.iconRight) {
    return props.iconRight;
  }

  if (props.type === "password") {
    // return passwordIsOpen.value ? mdiLockOff : mdiAsterisk
  }

  if (props.type === "list") {
    return mdiUnfoldMoreHorizontal;
  }

  return null;
});

const controlIconH = computed(() =>
  props.type === "textarea" ? "h-full" : "h-8"
);
const onPaste = (evt) => {
  console.log('on paste', evt)
  return true;
}


const passwordIsOpen = ref(false);

const rightIconClickable = computed(() => props.type === "password");

const openPasswordToggle = (e) => {
  if (rightIconClickable.value) {
    passwordIsOpen.value = !passwordIsOpen.value;
    emit("right-icon-click", e);
  }
};

const inputEl = ref(null);

if (props.ctrlKFocus) {
  const fieldFocusHook = (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      inputEl.value.focus();
    } else if (e.key === "Escape") {
      inputEl.value.blur();
    }
  };

  onMounted(() => {
    if (!theme.isFieldFocusRegistered) {
      window.addEventListener("keydown", fieldFocusHook);
      theme.isFieldFocusRegistered = true;
    } else {
      console.error("Duplicate field focus event");
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", fieldFocusHook);
    theme.isFieldFocusRegistered = false;
  });
}
</script>

<template>
  <div :class="upperWrapperClass">
    <div class="relative" :class="wrapperClass">
      <div v-if="computedType === 'static'" :class="inputElClass" class="inline-flex items-center whitespace-nowrap">
        {{ modelValue }}
      </div>
      <list-box-ui v-else-if="computedType === 'list'" v-model="computedValue" :options="options"
        :button-class="inputElClass" />
      <select v-else-if="computedType === 'select'" :id="id" v-model="computedValue" :name="name" :class="inputElClass">
        <option v-for="option in options" :key="option.id ?? option" :value="option">
          {{ option.name ?? option }}
        </option>
      </select>
      <textarea v-else-if="computedType === 'textarea'" :id="id" v-model="computedValue" :class="inputElClass"
        :name="name" :placeholder="placeholder" :required="required" />
      <button v-else-if="computedType === 'button'" :class="inputElClass" class="ring-blue-700">
        <icon v-if="buttonIcon" :path="buttonIcon" w="w-8" h="h-8" size="20" />
        <span v-if="buttonLabel" :class="{ 'ml-1': buttonIcon }">{{
            buttonLabel
        }}</span>
      </button>
      <input v-else :id="id" ref="inputEl" v-model="computedValue" :name="name" :autocomplete="autocomplete"
        :required="required" :placeholder="placeholder" :type="computedType" :class="inputElClass"
        :min="props.minDate" :max="props.maxDate" :readonly="props.readonly" />
      <control-icon v-if="computedIconLeft" :icon="computedIconLeft" :h="controlIconH" :text-color="textColor" />
      <control-icon v-if="computedIconRight" :icon="computedIconRight" :h="controlIconH" :text-color="textColor"
        :clickable="rightIconClickable" is-right @icon-click="openPasswordToggle" />
      <tip v-if="tipLeft" :tip="tipLeft" left />
      <tip v-if="tipRight" :tip="tipRight" right />
    </div>
    <field-help :help="help" :error="error" :success="success" class="mt-1" />
  </div>
</template>
