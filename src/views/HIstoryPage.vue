<template>
    <hero-bar>
   Call History List
  </hero-bar>
  <card-component has-table class="w-[90vw] m-auto mt-6">
     <table>
    <thead>
      <tr>


        


       
        <th>Call Recordings</th>
        <th>Date & Time</th>
        <th>Status</th>
        <th>Comment</th>
        
    
        
      </tr>
    </thead>
     <tbody>
        <tr v-for="(client, index) in nrecords" :key="client.id"
        :class="[tableTrStyle, index % 2 === 0 ? tableTrOddStyle : '']">
        <td data-label="Call Recordings">
          <small class="font-semibold text-gray-500 dark:text-gray-300">
            <audio class="h-8 w-[170px] sm:w-[170px] md:w-64 " controls>
              <source :src="client.audio" type="audio/ogg" />
              <source :src="client.audio" type="audio/mp3 " />
              Your browser does not support the audio tag.
            </audio>
          </small>
        </td>
        <td data-label="Date & Time">
          <small class="font-semibold text-gray-500 dark:text-gray-300">
            {{client.time}}
          </small>
        </td>
        <td data-label="Status">
          <small class="font-semibold text-gray-500 dark:text-gray-300" v-for="status in client.status" :key="client.status">
            {{status.main_status_name}}
          </small>
        </td>
        <td data-label="Comment">
          <small class="font-semibold text-gray-500 dark:text-gray-300" v-for="status in client.status" :key="client.status">
            {{status.comment}}
          </small>
        </td>
    </tr>
     </tbody>
    </table>
    <div :class="lightBorderStyle" class="p-3 lg:px-6 border-t dark:border-gray-800">
    
    </div>
  </card-component>
</template>

<script setup>
import HeroBar from "@/components/HeroBar.vue";
import CardComponent from "@/components/CardComponent.vue";
import { computed, ref,reactive, onBeforeMount, onMounted } from "vue";
import { themeStore } from "../stores/theme";
import { requiFormStore} from "@/stores/requirementForm"
import { poolListStore} from "@/stores/poolList"
const poolList = poolListStore()





const theme = themeStore();
const rqeForm = requiFormStore()

const lightBorderStyle = computed(() => theme.lightBorderStyle);

const lightBgStyle = computed(() => theme.lightBgStyle);

const tableTrStyle = computed(() => theme.tableTrStyle);

const tableTrOddStyle = computed(() => theme.tableTrOddStyle);

const darkMode = computed(() => theme.darkMode);

const perPage = 25;
const checkable = ref(false);
const pageLoading = ref(false)

// const isModalActive = ref(false);

// const isModalDangerActive = ref(false);

// const currentPage = ref(0);

// const checkedRows = ref([]);

// const propValues = reactive({
//   id: 0,
//   name: "",
//   enquiry: false,
//   highest_degree: {},
//   courses: [],
// });

// const isModalRecordActive = ref(false);

// const openRecordModal = (number, name) => {
//   isModalRecordActive.value = true;
//   propValues.id = number;
//   propValues.name = name;

// };

// const isModalStatusActive = ref(false);
// const maxPages = ref(10);
// const numPages = computed(() => Math.ceil(itemsCount.value / perPage));

const currentPageHuman = computed(() => currentPage.value + 1);
const nrecords = computed(() =>  poolList.nrecords);






onBeforeMount(async()=>{
// await rqeForm.getMissedCallList()
  const id = new URLSearchParams(window.location.search).get("id")
  console.log('id from url', id);
  await poolList.getCallHistoryList(id)
 
})

onMounted(async() =>{
  const id = new URLSearchParams(window.location.search).get("id")
  await poolList.getCallHistoryList(id)
 
})



</script>

<style lang="scss" scoped>

</style>