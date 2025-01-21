<template>
  <div class="relative z-40">
    <div class="fixed grid grid-flow-col w-full h-20 sm:content-between p-4 mb-4 bg-white
      sm:justify-items-center sm:w-[120px] sm:h-screen sm:inset-y-0 sm:left-0 sm:grid-flow-row sm:border-r-[1px]
      sm:pt-0 transform transition duration-400 ease-in-out" :class="{ '-translate-y-20': !showBar }">
      <button class="justify-self-start sm:justify-self-center sm:mt-10 w-10 h-10 relative focus:outline-none 
        bg-[#B4B4B4]/[.1] rounded-[12px]" @click="showMenu = !showMenu">
        <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ 'rotate-45': showMenu, ' -translate-y-1.5': !showMenu }"></span>
          <span aria-hidden="true"
            class="block absolute  h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ '-rotate-45': showMenu, ' translate-y-0.5': !showMenu }"></span>
        </div>
      </button>
      <router-link to="/" class="justify-self-center">
        <img loading="lazy" src="/***.svg" />
      </router-link>
      <div class="invisible sm:visible sm:gap-2 sm:pr-2 sm:grid-rows-2 sm:justify-self-center sm:grid sm:mb-10">
        <button v-for="lang in languageList" :class="currentLanguage === lang.code ? 'font-bold' : 'font-normal'"
          @click="_changeLanguage(lang.code)" :disabled="currentLanguage === lang.code">
          {{ lang.code.toUpperCase() }}
        </button>
      </div>
    </div>
  </div>
  <TransitionRoot as="template" :show="showMenu">
    <Dialog as="div" class="fixed top-10 w-full z-30 sm:top-0 sm:left-[120px]" @close="showMenu = false">
      <TransitionChild as="template" enter="transition ease-in-out duration-700" enter-from="-translate-x-60 opacity-50"
        enter-to="translate-x-0" leave="transition ease-in-out duration-700" leave-from="translate-x-0"
        leave-to="-translate-x-60 opacity-0">
        <div class="grid grid-cols-2 bg-white">
          <div class="relative flex flex-col flex-1">
            <div class="relative flex flex-col h-screen inset-y-0 ml-14 my-24 sm:ml-24">
              <div class="relative flex flex-col h-1/2 w-screen overflow-auto">
                <div v-for="(menu, index) in menus" class="group" @mouseover="displayedIndex = index">
                  <router-link v-if="menu.to !== undefined" :to="menu.to !== undefined ? menu.to : ''">
                    <button
                      class="text-[24px] sm:text-[16px] w-screen sm:w-max text-black text-left flex flex-col relative my-3 items-start"
                      @click="showMenu = false">
                      <div class="flex flex-row">
                        <div class="transition ease-in-out duration-100 hover:underline underline-offset-4"
                          @mouseover="displayedSubIndex = null"
                          :class="(displayedSubIndex !== null && displayedIndex !== index) ? 'opacity-25' : 'opacity-100'">
                          {{ menu.name }}
                        </div>
                      </div>
                    </button>
                  </router-link>
                  <div v-else class="flex my-3 text-[24px] sm:text-[16px]">
                    <button class="hover:underline underline-offset-4"
                      @click="displayedSubIndex === index ? displayedSubIndex = null : displayedSubIndex = index"
                      @click.stop>{{ menu.name }}
                    </button>
                    <svg v-if="menu.subMenu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1" stroke="currentColor"
                      class="w-8 h-8 sm:w-4 sm:h-4 ml-3 mt-1 transition duration-150 ease-in-out "
                      :class="displayedSubIndex == index ? 'transform -rotate-180' : ''"
                      @click="displayedSubIndex === index ? displayedSubIndex = null : displayedSubIndex = index"
                      @click.stop>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                  <TransitionRoot as="template" enter="transition ease-in-out duration-300"
                    enter-from="-translate-x-20 opacity-0" enter-to="translate-x-0 opacity-100"
                    leave="transition ease-in-out duration-300" leave-from="translate-x-0 opacity-100"
                    leave-to="-translate-x-20 opacity-0" :show="displayedSubIndex === index">
                    <div class="ml-8 sm:absolute sm:ml-48 mt-2 sm:-mt-12 lg:ml-72 md:ml-48">
                      <div v-for="subMenu in menu.subMenu">
                        <router-link :to="subMenu.to">
                          <button @click="showMenu = false"
                            class="text-[24px] sm:text-[16px] w-56 text-left my-3 hover:underline underline-offset-4">
                            {{ subMenu.name }}
                          </button>
                        </router-link>
                      </div>
                    </div>
                  </TransitionRoot>
                </div>
              </div>
              <div class="absolute bottom-52 inset-x-0 text-[24px] sm:text-[16px] text-black my-3">
                <router-link to='/contact'>
                  <button class="mb-4 hover:underline underline-offset-4" @click="showMenu = false">
                    Contact
                  </button>
                </router-link>
                <div class="flex gap-2 sm:invisible">
                  <button v-for="lang in languageList"
                    :class="currentLanguage === lang.code ? 'text-[20px]' : 'text-normal'"
                    @click="_changeLanguage(lang.code)" :disabled="currentLanguage === lang.code">
                    {{ lang.code.toUpperCase() }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img loading="lazy" src="/img_menu.png" class="hidden sm:block pr-20 bg-contain bg-center" />
        </div>
      </TransitionChild>

      <div class="shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind-config'
import { mapGetters } from 'vuex';
import utils from '@/helpers/utils';

const fullConfig = resolveConfig(tailwindConfig)

export default {
  name: "Sidebar",
  components: { Dialog, DialogOverlay, TransitionChild, TransitionRoot },
  mounted() {
    let strPixelMobile = fullConfig.theme.screens.sm;
    let nbPixelMobile = parseInt(strPixelMobile.slice(0, strPixelMobile.length - 2))
    if (window.innerWidth < nbPixelMobile) {
      window.addEventListener("scroll", () => {
        this.showBar = this.lastScrollY > window.scrollY;
        this.lastScrollY = window.scrollY;
      });
    }
  },
  computed: {
    ...mapGetters(['currentLanguage', 'languageList']),
  },
  data() {
    return {
      showMenu: false,
      showBar: true,
      lastScrollY: window.scrollY,
      menus: [{
        'name': 'Home',
        'to': '/'
      }, {
        'name': 'Disciplines',
        'subMenu': [{
          'name': 'Sport',
          'to': '/sport'
        }]
      }, {
        'name': 'Planning & Tarification',
        'to': '/planning'
      }],
      displayedIndex: null,
      displayedSubIndex: null
    }
  },
  watch: {
    showMenu(oldValue, newValue) {
      if (newValue === false) {
        this.displayedSubIndex = null;
      }
    }
  },
  methods: {
    _changeLanguage(lang) {
      utils.changeLanguage(lang);
    }
  },
}
</script>
