<template>
  <div class="h-screen text-white bg-cover bg-center"
    v-bind:style="{ backgroundImage: 'url(' + contentData.concept?.image_home.path + ')' }">
    <!-- <video autoplay muted loop class="h-screen object-cover">
      <source src="/test-video.mp4" type="video/mp4">
    </video> -->
    <div class="flex flex-col h-screen ml-12 sm:ml-36">
      <div class="flex flex-col grow justify-center -mt-64 mr-24 sm:pt-24 sm:mt-0">
        <p class="text-[24px]">Sub-title</p>
        <p class="text-[48px]">Title</p>
      </div>
      <p class="text-[16px] pb-24 md:pb-12">Scroll down to learn more</p>
    </div>
  </div>

  <br class="py-6" />

  <div class="text-[16px] my-3 px-4 sm:px-20 grid grid-cols-2">
    <p class="text-[#7C7C7C]">Introduction</p>
    <p class="justify-self-end">Sport Club</p>
    <hr class="my-4 col-span-2">
  </div>

  <div>
    <Bloc1 link="/planning">
      <template #title>
        <OurConcept />
      </template>
      <template #text1>
        {{ contentData.concept?.our_concept_quote_Left }}
      </template>
      <template #text2>
        {{ contentData.concept?.block_right }}
      </template>
      <template #button>Book A Session</template>
    </Bloc1>

    <div class="grid grid-cols-3 mx-10 sm:mr-20 sm:pl-12">
      <img v-if="contentData.concept?.image_our_concept.path" loading="lazy"
        :src="contentData.concept.image_our_concept.path" class="w-full col-span-3 md:col-start-2 md:col-span-2" />
    </div>

    <div class="pb-20"></div>

    <div>
      <div class="bg-[#F6F6F6] mx-2 sm:mx-20 py-20 flex flex-col items-center sm:items-start sm:flex-row">
        <img loading="lazy" src="/citation.png" class="w-4 sm:w-8 pb-8 ml-8 mr-4 lg:mx-20" />
        <div>
          <p class="lg:text-[20px] sm:mr-20 text-left py-6 sm:mx-10 mx-8">
            {{ contentData.concept?.block_middle_quote }}
          </p>
        </div>
      </div>
    </div>
    <div class="pb-20"></div>
    <img v-if="contentData.concept?.image_martial_art_school.path" loading="lazy"
      :src="contentData.concept.image_martial_art_school.path" class="w-screen object-cover px-10 sm:px-20" />
  </div>

  <div class="sm:pb-20"></div>

  <div>
    <Bloc1 link="/contact">
      <template #title>
        <TheMartialArtSchool />
      </template>
      <template #text1>
        <p v-html="contentData.concept?.bloc_2_the_Martial_Art_School_bloc_left"></p>
      </template>
      <template #text2>
        <p v-html="contentData.concept?.Bloc_2_the_martial_school_main_bloc"></p>
      </template>
      <template #button>
        More Info
      </template>
    </Bloc1>
    <Carousel :images="contentData.concept?.images_carousel" />
  </div>

  <div class="pb-[80px] sm:pb-[180px]"></div>

  <div>
    <div class="grid grid-cols-3 sm:py-4 pt-16 sm:pt-24 pb-72 sm:pb-96 bg-[#F6F6F6]">
      <img loading="lazy" src="/img_4.png" class="pt-8 pb-8 pl-10 sm:pl-24" />
      <div class="col-span-2">
        <div class="sm:pt-4 sm:pb-24">
          <Sport />
        </div>
      </div>
      <div class="grid col-span-3 px-10 sm:col-span-2 sm:col-start-2">
        <p class="text-[24px] text-[#7C7C7C] sm:pr-12 sm:mr-12 pb-12">
          {{ contentData.concept?.Sport_intro_subtitle }}
        </p>
        <hr class="py-4 sm:py-6 pr-12" />
        <p class="text-[16px] sm:pr-16 pb-10 sm:pb-16 sm:mr-12">
          {{ contentData.concept?.Sport_main_block_ }}
        </p>
        <router-link to="/planning">
          <button class="btn-secondary justify-self-start">
            Book A Session
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <div class="flex place-content-center">
    <img loading="lazy" :src="contentData.concept?.Sport_image.path" class="relative -top-56 sm:-top-64 -mb-48 px-10 sm:px-0" width="1162" />
  </div>

  <CallToAction :text="contentData.bloc_commun?.Bloc_texte_commun" btnText="Contact Us" bgUrl="/img_6.png"
    link="/contact" />
  <!-- :bgUrl="contentData?.bloc_commun?.bloc_text_commun_image_background" -->

  <div class="pb-20"></div>

  <div>
    <div class="pb-12 -ml-6 sm:pt-20 sm:pb-24 sm:pl-20">
      <TheFounders />
    </div>

    <PersonLayout v-if="founders.length > 0" v-for="person in founders" :title="person.name" :palmares="person.palmares"
      :descriptionText="person.description" :img="isVertical ? person.image_mobile?.path : person.image_desktop?.path" />
  </div>
</template>
  
<script>
import Carousel from '@/components/Carousel.vue';
import Bloc1 from '@/layouts/Bloc1.vue';
import PersonLayout from '@/layouts/PersonLayout.vue';
import OurConcept from '@/components/animatedTitles/OurConcept.vue';
import Sport from '@/components/animatedTitles/Sport.vue';
import TheFounders from '@/components/animatedTitles/TheFounders.vue';
import TheMartialArtSchool from '@/components/animatedTitles/TheMartialArtSchool.vue';
import CallToAction from '@/components/CallToAction.vue';
import Axios from '@/service/index.js'
import { mapGetters } from 'vuex';
import utils from '@/helpers/utils';

export default {
  components: {
    Carousel,
    Bloc1,
    PersonLayout,
    OurConcept,
    TheMartialArtSchool,
    Sport,
    TheFounders,
    CallToAction
  },
  mounted() {
    this.updateScreenWidth()
    Axios
      .get('/club/founders')
      .then((response) => {
        this.founders = response.data;
      })
  },
  data() {
    return {
      founders: [],
      screenWidth: 0,
    }
  },
  computed: {
    ...mapGetters(['contentData']),
    isVertical() {
      return utils.isVertical()
    },
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  },
}
</script>
