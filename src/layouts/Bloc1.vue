<template>
  <div class="sm:pt-4 pb-20">
    <div class="sm:pt-2 sm:pb-4 -ml-6 sm:pl-20">
      <slot name="title" />
    </div>
    <div class="grid px-10 sm:ml-12 gap-y-6 min-[1100px]:grid-cols-3 md:grid-cols-2 sm:px-0 pt-2">
      <p class="text-[16px] text-[#7C7C7C] min-[1100px]:col-start-2 sm:mr-32">
        <slot name="text1" />
      </p>
      <div class="grid md:-ml-20">
        <p class="text-[16px] sm:pr-24 pb-12">
          <slot name="text2" />
        </p>
        <router-link v-if="link" :to="link">
          <button class="btn-primary justify-self-start">
            <!-- Need to be a slot ?? -->
            <slot name="button" />
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: false
    },
  },
}
</script>
