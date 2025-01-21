<template>
  <div class="relative flex h-screen bg-white justify-center text-white py-6">
    <div class="absolute w-4/5 flex flex-col items-center pt-8">
      <p class="text-[16px] justify-self-center">***</p>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="2" x2="100" y2="2" stroke="white" stroke-width='0.03' />
      </svg>
    </div>
    <div class="absolute h-screen flex flex-col justify-center items-center">
      <p v-if="data" class="text-[48px]">{{ data.name }}</p>
      <p class="text-[16px]">Scroll down to learn more</p>
    </div>
    <video v-if="data" autoplay muted loop :poster="data?.video_poster?.path" class="object-cover w-screen mx-20 rounded">
      <source :src="isVertical && data?.video_mobile ? data.video_mobile.path : data?.video_desktop?.path"
        type="video/mp4">
    </video>
  </div>

  <br class="py-6" />

  <div class="text-[16px] my-3 px-4 sm:px-20 grid grid-cols-2">
    <p class="text-[#7C7C7C]">Introduction</p>
    <hr class="my-4 col-span-2">
  </div>

  <div>
    <div class="lg:pt-8 md:pb-8 md:pl-20">
      <slot name="title" />
    </div>
    <div class="grid pt-2 gap-y-4 pl-4 pr-16 lg:grid-cols-9">
      <p v-if="data" class="text-[16px] pb-8 lg:mx-20 lg:col-span-4">
        <i>{{ data.quote }}</i>
      </p>
      <div class="grid lg:col-span-5">
        <div class="text-[16px] pb-16">
          <p v-if="data">
            <span v-html="data.intro"></span>
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <button v-if="data && data.coaches.length > 0" class="flex items-center"
            @click="this.$refs.coaches.scrollIntoView({ behavior: 'smooth' });">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd" />
            </svg>
            <p class="pl-4 text-[18px]">View Coaches</p>
          </button>
          <router-link :to="{ name: 'planningdiscipline', params: { selectedDisciplineKey: planningKey } }">
            <button class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clip-rule="evenodd" />
              </svg>
              <p class="pl-4 text-[18px]">View Planning</p>
            </button>
          </router-link>
        </div>
        <router-link to="/planning">
          <button class="btn-primary justify-self-start mt-16">
            Book A Session
          </button>
        </router-link>
      </div>
    </div>
    <div v-if="data" class="grid py-20 items-start place-items-center mx-20"
      :class="isVertical ? 'grid-cols-1 gap-y-12' : 'grid-cols-1 gap-y-12 lg:grid-cols-9'">
      <img :class="isVertical ? 'col-span-1' : 'col-span-4 lg:pr-20'" loading="lazy" :src="images[0]?.path" />
      <img :class="isVertical ? 'col-span-1' : 'col-span-5'" loading="lazy" :src="images[1]?.path" />
    </div>
  </div>

  <div v-if="data && data.coaches.length > 0">
    <div class="py-16 pl-2 sm:pb-24 sm:pt-28 sm:pl-20" ref="coaches">
      <TheCoaches />
    </div>

    <PersonLayout v-if="data" v-for="person in data.coaches" :title="person.name" :palmares="person.palmares"
      :descriptionText="person.profile" :img="person.photo.path" />

  </div>

  <div class="relative">
    <div class="relative bg-[#F6F6F6] py-12 px-8 sm:px-4 sm:pt-24 lg:pb-80 grid justify-items-center gap-8 sm:gap-14
        sm:-bottom-40">
      <img loading="lazy" src="/citation.png" class="w-4" />
      {{ data?.quote2_author }}
      <div v-if="data" class="text-[24px] lg:text-[36px] sm:w-1/2 text-center">
        {{ data.quote2 }}
      </div>
      <img loading="lazy" src="/citation.png" class="w-4" />
    </div>
  </div>

  <Carousel :images="data?.gallery" />

  <div class="py-4 sm:py-8" />

  <div class="text-[16px] pl-80 max-[1130px]:px-6 w-4/5">
    <p v-html="contentData.bloc_commun?.bloc_texte_2" />
  </div>

  <div class="py-12" />

  <CallToAction :text="contentData.bloc_commun?.Bloc_texte_commun" btnText="Book a Session" bgUrl="/img_6.png"
    link="/planning" />
</template>
      
<script>
import Carousel from '@/components/Carousel.vue';
import PersonLayout from '@/layouts/PersonLayout.vue';
import CallToAction from '@/components/CallToAction.vue';
import TheCoaches from '@/components/animatedTitles/TheCoaches.vue';
import { mapGetters } from 'vuex';
import utils from '@/helpers/utils';

export default {
  components: {
    Carousel,
    PersonLayout,
    CallToAction,
    TheCoaches
  },
  props: {
    data: {},
    title: undefined,
    planningKey: ""
  },
  computed: {
    ...mapGetters(['contentData']),
    isVertical() {
      return utils.isVertical()
    },
    images() {
      if (this.data?.images_mobile.length > 0 && utils.isVertical()) {
        return this.data.images_mobile
      } else if (this.data?.images_desktop.length > 0) {
        return this.data.images_desktop
      } else {
        return []
      }
    }
  }
}
</script>
