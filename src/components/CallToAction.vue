<template>
  <!-- FIXME dynamic bg not working ?? -->
  <div
    class="grid mx-10 md:mx-20 sm:h-[421px] content-start bg-center bg-cover bg-no-repeat text-white bg-[url('/img_6.png')]">
    <p class="relative m-16 sm:m-2 md:w-3/4 lg:w-1/2 text-[24px] sm:pt-24 sm:pb-12 sm:ml-12 lg:ml-40">
      {{ text }}
      <br>
      <router-link v-if="link" :to="link">
        <button class="mt-8 sm:absolute sm:-bottom-20 sm:left-0 btn-secondary">
          {{ btnText }}
        </button>
      </router-link>
    </p>
  </div>
</template>

<script>
import { stringifyQuery } from 'vue-router';

export default {
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    btnText: {
      type: String,
      required: true
    },
    bgUrl: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
}
</script>

