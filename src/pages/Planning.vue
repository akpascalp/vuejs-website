<template>
  <div class="px-4 sm:px-20">
    <div>
      <div class="sm:py-[120px]">
        <ThePlanningAndTarification />
      </div>

      <img src="/img_7.png" class="place-self-center pb-[60px]" width="1200" />

      <p class="pb-16 lg:pb-[90px] lg:w-5/12">
        {{ contentData.planning_tarifictions?.texte_intro }}
      </p>

      <div ref="filtersAnchor" class="flex flex-col sm:items-center gap-8 sm:flex-row sm:gap-20">
        <div class="flex flex-col gap-4 w-48">
          <label class="pr-8">Select a discipline</label>
          <ListBox :dataList="filters.disciplines" @update="selectedDiscipline = $event"
            :initValue="selectedDisciplineInitData" :addAllOption="false" />
        </div>
        <div class="flex flex-col gap-4 w-96">
          <label class="pr-8">Select a level</label>
          <ListBox :dataList="filters.levels" @update="selectedLevels = $event" />
        </div>
        <div class="flex flex-col gap-4 w-36">
          <label class="pr-8">Select a day</label>
          <ListBox :dataList="filters.dows" @update="selectedDays = $event" />
        </div>
      </div>

      <hr v-if="categories.length > 0" class="mt-12 sm:mt-[60px]" />
      <div class="flex gap-12 my-12 flex-wrap">
        <div v-if="filters" v-for="category in displayedCategories" class="flex gap-4 items-center">
          <svg width="16" height="16">
            <rect width="16" height="16" rx="6" :style="'fill:' + category.color" />
          </svg>
          <p>{{ category.name }}</p>
        </div>
      </div>

      <hr class="mt-12" />

      <div class="grid">
        <svg v-show="isLoadingData" class="animate-spin w-6 opacity-50 mt-8 justify-self-center self-center"
          fill="#000000" width="40px" height="40px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z" />
        </svg>
      </div>

      <div v-show="Object.keys(dataAll).length === 0 && !isLoadingData"
        class="bg-[#F6F6F6] border-t-4 border-slate-100 rounded-b text-teal-900 px-4 py-3 shadow-md opacity-80"
        role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 border-slate-100 mr-4" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg></div>
          <div>
            <p class="font-bold">Nothing to show</p>
            <p class="text-sm">No activity for the selected filters</p>
          </div>
        </div>
      </div>

      <div v-for="(data, name, index) in dataAll" class="flex flex-col">
        <Disclosure v-slot="{ open }" :defaultOpen=true>
          <DisclosureButton class="flex justify-between items-center">
            <p class="text-[24px] my-[35px]">{{ filters.dows.find(x => x.value === name)?.text }}</p>
            <button class="flex">
              <p v-if="open" class="text-[16px]">Collapse</p>
              <p v-else class="text-[16px]">Expand</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="w-4 h-4 ml-3 mt-1 transition duration-150 ease-in-out"
                :class="open ? 'rotate-180 transform' : ''">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </DisclosureButton>
          <transition enter-active-class="transition duration-200 ease-in-out"
            enter-from-class="transform opacity-50 -translate-y-16" enter-to-class="transform opacity-100"
            leave-active-class="transition duration-200 ease-in-out" leave-from-class="transform opacity-50"
            leave-to-class="transform opacity-0 -translate-y-8">
            <DisclosurePanel>
              <ul class="text-[16px] pb-8">
                <li v-for="activity in data">
                  <router-link class="flex flex-col"
                    :to="{ name: 'contactbooking', params: { bookingDate: getBookingDatetime(activity) } }">
                    <button class="grid grid-cols-2 py-3 hover:bg-slate-50">
                      <p class="justify-self-start">{{ displayTime(activity.start_time) }} - {{
                        displayTime(activity.end_time) }}</p>
                      <div class="flex gap-4 items-center justify-self-end">
                        <svg width="16" height="16">
                          <rect width="16" height="16" rx="6"
                            :style="'fill:' + categories.find(x => x.id === parseInt(activity.level_id))?.color" />
                        </svg>
                        <p>{{ filters.disciplines.find(x => x.value === parseInt(activity.discipline_id)).text }}</p>
                      </div>
                    </button>
                  </router-link>
                </li>
              </ul>
            </DisclosurePanel>
          </transition>
        </Disclosure>

        <hr v-if="index !== dataAll.length - 1" />
      </div>
    </div>

    <div class="h-6 sm:h-36"></div>

    <div>
      <div class="pb-12 sm:pb-20">
        <PricingSystem />
      </div>
      <div class="grid lg:grid-cols-2">
        <p class="text-[20px] lg:text-[16px] text-[#7C7C7C] pb-12">
          {{ contentData.planning_tarifictions?.pricing_system_explanation_1 }}
        </p>
        <div class="flex flex-col gap-8 justify-self-end">
          <span v-html="contentData.planning_tarifictions?.princing_system_bloc_text_pack_system" />
          <hr class="mx-8" />
          <span v-html="contentData.planning_tarifictions?.princing_system_bloc_text_pack_a_la_carte" />
          <hr class="mx-8" />
          <span v-html="contentData.planning_tarifictions?.princing_system_bloc_text_drop_in" />
        </div>

        <button class="font-bold lg:col-start-2 pt-20 justify-self-end hover:underline underline-offset-4">
          <a :href="contentData.other?.planning_link" download target="_blank">Download Planning & Tarification</a>
        </button>


        <div class="pt-16 col-start-1 lg:pt-24 lg:mr-24 text-[#7C7C7C] text-[16px] pb-16">
          <p>
            {{ contentData.planning_tarifictions?.pricing_system_explanation_2 }}
          </p>
        </div>
        <router-link to='/contact' class="col-start-1 justify-self-start">
          <button class="btn-primary w-56">
            Contact Us
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
          
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import ThePlanningAndTarification from '@/components/animatedTitles/ThePlanningAndTarification.vue';
import PricingSystem from '@/components/animatedTitles/PricingSystem.vue';
import ListBox from '@/components/ListBox.vue';
import Axios from '@/service/index.js'
import { mapGetters } from 'vuex';

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ListBox,
    ThePlanningAndTarification,
    PricingSystem
  },
  props: {
    selectedDisciplineKey: {
      type: String,
      required: false,
      default: undefined
    }
  },
  computed: {
    ...mapGetters(['contentData']),
    displayedCategories() {
      if (this.selectedLevels.includes(null)) {
        return this.categories
      } else {
        return this.categories.filter(x => this.selectedLevels.includes(x.id))
      }
    }
  },
  data() {
    return {
      filters: { disciplines: [{value: null, text: "All"}], levels: [], dows: [] },
      categories: [],
      selectedDays: [],
      selectedDiscipline: undefined,
      selectedLevels: [],
      dataAll: {},
      selectedDisciplineInitData: { value: 1, text: 'Sport' },
      abortController: new AbortController(),
      isLoadingData: false,
    }
  },
  beforeMount() {
    Axios
      .get('/club/sessions/filters')
      .then(res => {
        this.dows = res.data.dows;
        Object.entries(res.data.dows).forEach(x => this.filters.dows.push({ value: x[0], text: x[1] }))
        res.data.disciplines.forEach(x => this.filters.disciplines.push({ value: x.id, text: x.name }))
        this.categories = res.data.levels;

        if (this.selectedDisciplineKey !== undefined) {
          this.filters.disciplines.forEach(x => {
            if (this.selectedDisciplineKey === x.text) {
              this.selectedDisciplineInitData = x;
            }
          })
        } else {
          this.selectedDisciplineInitData = this.filters.disciplines[0];
        }
      })
  },
  mounted() {
    setTimeout(() => {
      this.$scrollTo(this.$refs.filtersAnchor, 2000, { offset: -20 });
    }, 1200);
  },
  watch: {
    selectedDays() {
      this.updateFilteredData();
    },
    selectedDiscipline() {
      this.updateFilteredData();
      this.updateLevels();
    },
    selectedLevels() {
      this.updateFilteredData();
    }
  },
  methods: {
    updateFilteredData() {
      if (this.isLoadingData) {
        // Cancel all previous ongoing API calls
        this.abortController.abort()
        this.abortController = new AbortController()
      }
      let params = {};
      if (this.selectedDays.length > 0 && !this.selectedDays.includes(null)) {
        params.dows = Object.values(this.selectedDays).join(",")
      }
      if (this.selectedDiscipline && this.selectedDiscipline !== null) {
        params.discipline = this.selectedDiscipline
      }
      if (this.selectedLevels.length > 0 && !this.selectedLevels.includes(null)) {
        params.levels = Object.values(this.selectedLevels).join(",")
      }
      this.isLoadingData = true;
      Axios
        .get("/club/sessions", { params, signal: this.abortController.signal })
        .then(res => {
          this.dataAll = {}
          for (let activity of res.data) {
            if (this.dataAll[activity.dow] === undefined) {
              this.dataAll[activity.dow] = [activity]
            } else {
              this.dataAll[activity.dow].push(activity)
            }
          }
          this.dataAll = this.sortKeys(this.dataAll, Object.keys(this.dows))

          this.isLoadingData = false;
        })
        .catch(err => {
          this.isLoadingData = false;
          if (err.code !== "ERR_CANCELED") {
            console.log(err)
          }
        })
    },
    displayTime(strTime) {
      const date = new Date(Date.parse("0000-01-01T" + strTime))
      let formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: true });
      if (date.getHours() === 12) {
        formattedTime = formattedTime.replace(/^00/, '12');
      }
      return formattedTime;
    },
    getBookingDatetime(activity) {
      return this.getNextDateForDayOfWeek(activity.dow) + 'T' + activity.start_time.slice(0, 5)
    },
    getNextDateForDayOfWeek(dayOfWeek) {
      const daysOfWeek = this.rotateListUntilTargetFirst(Object.keys(this.dows), 'sun');
      const today = new Date();
      const currentDay = today.getDay();
      const targetDay = daysOfWeek.indexOf(dayOfWeek.toLowerCase());

      if (targetDay === -1) {
        return 'Invalid date';
      }

      let daysUntilNext = targetDay - currentDay;
      if (daysUntilNext <= 0) {
        daysUntilNext += 7;
      }

      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + daysUntilNext);
      const nextDateStr = nextDate.getFullYear() + '-' + String(nextDate.getMonth() + 1).padStart(2, '0') + '-' + String(nextDate.getDate()).padStart(2, '0')
      return nextDateStr;
    },
    rotateListUntilTargetFirst(list, target) {
      const index = list.indexOf(target);
      if (index === -1) {
        return "Target not in list.";
      }
      return [...list.slice(index), ...list.slice(0, index)];;
    },
    sortKeys(object, keyOrder) {
      const sortedKeys = Object.keys(object).sort((keyA, keyB) => {
        const indexA = keyOrder.indexOf(keyA);
        const indexB = keyOrder.indexOf(keyB);

        if (indexA === -1) return 1; // Put invalid keys at the end
        if (indexB === -1) return -1;

        return indexA - indexB;
      });

      const sortedObject = {};
      for (const key of sortedKeys) {
        sortedObject[key] = object[key];
      }

      return sortedObject;
    },
    updateLevels() {
      if (this.selectedDiscipline) {
        Axios
          .get('/club/sessions/filters/discipline/' + this.selectedDiscipline)
          .then(res => {
            this.dows = res.data.dows;
            this.filters.dows = []
            this.filters.levels = [];
            Object.entries(res.data.dows).forEach(x => this.filters.dows.push({ value: x[0], text: x[1] }))
            this.categories = res.data.levels;
            res.data.levels.forEach(x => this.filters.levels.push({ value: x.id, text: x.name }));
            if (this.filters.levels.length > 0) {
              this.selectedLevels = [this.filters.levels[0].value]
            } else {
              this.selectedLevels = []
            }
          })
      }
    },
  }
}
</script>
