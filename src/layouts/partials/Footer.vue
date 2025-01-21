<template>
  <footer class="bottom-0 pb-28">
    <br class="py-12" />
    <div class="grid">
      <button href="#" class="text-[16px] place-self-end m-6 mr-4 md:mr-20" @click="toTop">Back to top</button>
    </div>
    <hr class="mx-4 md:mx-20" />
    <br class="py-20" />

    <div class="px-4 md:pl-20 py-4 text-[16px]">
      <router-link to="/"><img loading="lazy" src="/CLUB.svg" class="md:w-8" /></router-link>
      <div class="flex flex-col gap-y-8 md:grid md:grid-cols-6 pt-6">
        <div class="md:col-span-2 md:-mr-8">
          <p>
            {{ contentData.bloc_commun?.footer }}
          </p>
          <div class="flex gap-x-4 pt-4 content-start">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8" x="0px" y="0px" viewBox="0 0 30 30">
                <path
                  d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z">
                </path>
              </svg></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8" x="0px" y="0px" viewBox="0 0 32 32">
                <path
                  d="M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z">
                </path>
              </svg>
            </a>
          </div>
        </div>
        <div class="flex flex-col gap-y-2 col-start-4">
          <div class="hover:underline underline-offset-4">
            <router-link to="/">Home</router-link>
          </div>
          <Disclosure v-slot="{ open }">
            <DisclosureButton>
              <div class="flex hover:underline underline-offset-4">
                <span>Disciplines</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                  stroke="currentColor" class="w-4 h-4 ml-3 mt-1 transition duration-150 ease-in-out"
                  :class="open ? 'rotate-180 transform' : ''">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col pl-4 gap-y-2">
              <div class="hover:underline underline-offset-4">
                <router-link to="/sport">Sport</router-link>
              </div>
            </DisclosurePanel>
          </Disclosure>
          <div class="hover:underline underline-offset-4">
            <router-link to="/planning">Planning & Tarification</router-link>
          </div>
        </div>
        <div class="flex flex-col gap-y-2 text-[#606060]">
          <div class="hover:underline underline-offset-4 text-">
            <router-link to='/contact'>Contact</router-link>
          </div>
        </div>
        <div class="flex flex-col gap-y-2 items-start">
          <button v-for="lang in languageList" class="hover:underline underline-offset-4"
            :class="currentLanguage === lang.code ? 'font-black' : 'font-normal'" @click="_changeLanguage(lang.code)"
            :disabled="currentLanguage === lang.code">
            {{ lang.text }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

import utils from '@/helpers/utils';
import { mapGetters } from 'vuex';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  },
  computed: {
    ...mapGetters(['currentLanguage', 'languageList', 'contentData']),
  },
  methods: {
    toTop() {
      utils.toTop()
    },
    _changeLanguage(lang) {
      utils.changeLanguage(lang);
    }
  }
}
</script>
