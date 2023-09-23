<script setup>
import { computed, onMounted, reactive, ref, onBeforeMount } from "vue";
import { mdiClose } from "@mdi/js";
import JbButton from "@/components/JbButton.vue";
import JbButtons from "@/components/JbButtons.vue";
import CardComponent from "@/components/CardComponent.vue";
import Level from "@/components/Level.vue";
import TextLink from "@/components/TextLink.vue";
import Overlay from "@/components/Overlay.vue";
import Multiselect from "@vueform/multiselect";
import { selectClasses } from "../selectcss";
import Field from "@/components/Field.vue";
import Control from "@/components/Control.vue";
import {poolListStore } from "@/stores/poolList"
import { themeStore } from "../stores/theme";
import {reqliststore } from "@/stores/reqbd"

const reqStore = reqliststore()
const poolStore = poolListStore()

const theme = themeStore();


const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  largeTitle: {
    type: String,
    default: null,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Done",
  },
  shake: Boolean,
  hasCancel: Boolean,
  textLinkLabel: {
    type: String,
    default: null,
  },
  textLinkIcon: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  data: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: value => emit("update:modelValue", value),
});

const confirmCancel = mode => {
  value.value = false;
  emit(mode);
};

// const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel("cancel");

onBeforeMount(async () => {
  await poolStore.getBDList()
 await poolStore.getDTList()
});






// v-model

const form = reactive({
  bd: [],
  dt: [],
  comment:""
})


const bdList = computed(()=> poolStore.$state.bdList)
const fetchBd = async (query) => {
  await poolStore.getBDList(query)
}

const dtList = computed(()=> poolStore.$state.dtList)

const fetchDt = async (query) => {
  await poolStore.getDTList(query)
}

const bdError = ref(false)
const dtError = ref(false)

const conditionCheck = () =>{
  if (form.bd.length === 0) {
    bdError.value = "Select BD"
  }
  if (form.dt.length === 0) {
    dtError.value = "Select BD"
  }
}





const submitFunc = async (data,id) => {
   bdError.value = false
  dtError.value = false
  conditionCheck()
  if (form.bd.length === 0) {
    bdError.value = "Select BD"
     return
  }
  else if (form.dt.length === 0) {
    dtError.value = "Select BD"
    return
  }
  else {
    await reqStore.postBdAssignToDt(form)
    cancel()
    form.bd = []
    form.dt = []
    form.comment = ""
  }


};
</script>

<template>
  <overlay v-show="value" @overlay-click="cancel">
    <card-component
      v-show="value"
      :title="title"
      class="z-50 max-h-modal w-full shadow-lg md:w-3/5 lg:w-2/5"
      :header-icon="mdiClose"
      modal
      @submit="submitFunc()"
    >
      <div class="space-y-3">
        <slot />
      </div>

      <template #header>
        <h4 class="">
          &nbsp;<span class="text-2xl uppercase text-green-600"
            >Assign BD to DT</span
          >
          &nbsp;
        </h4>
      </template>

      <div
        class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1"
      >
        
        

        <!-- reason list -->
        <field label="Select BD" :error="bdError">
          <Multiselect
            :custom-label="username"
            label="username"
            track-by="username"
            valueProp="id"
            searchable
            :classes="selectClasses"
            :close-on-select="true"
            placeholder="Select BD"
           :options="bdList"
            class="multi"
            @search-change="fetchBd"
            mode="tags"
            v-model="form.bd"
          />
        </field>

        <field label="Select DT" :error="dtError">
          <Multiselect
            :custom-label="username"
            label="username"
            track-by="username"
            valueProp="id"
            searchable
            :classes="selectClasses"
            :close-on-select="true"
            placeholder="Select DT"
           :options="dtList"
            class="multi"
            @search-change="fetchDt"
            mode="tags"
            v-model="form.dt"
          />
        </field>

        <field label="Comment">
          <control type="textarea" v-model="form.comment"/>
        </field>
        
      </div>

      <template #footer>
        <level mobile>
          <div class="flex items-center justify-between">
            <div>
              <jb-buttons>
                 <jb-button
                  type="submit"
                  label="Submit"
                  color="success"
                  outline
                 @click="submitFunc"
                />
                <jb-button
                  v-if="hasCancel"
                  label="Cancel"
                  color="danger"
                  outline
                  @click="cancel"
                />

               
              </jb-buttons>
            </div>
          </div>

          <text-link :label="textLinkLabel" :icon="textLinkIcon" />
        </level>
      </template>
    </card-component>
  </overlay>
</template>
