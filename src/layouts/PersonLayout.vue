<template>
  <div class="grid px-4 sm:px-0 sm:pr-20">
    <div class="sm:grid sm:grid-cols-2">
      <div class="text-[36px] pb-12 sm:pl-20 sm:w-3 font-[500]">
        {{ title }}
      </div>
      <div v-show="palmares" class="pb-8 sm:px-0 sm:pb-20">
        <div v-for="data in palmares">
          <p class="text-[20px] sm:text-[24px] py-4 sm:py-6">
            {{ [data.title, data.description, data.year].filter((x) => x != "").join(" - ") }}
          </p>
          <hr class="pb-2">
        </div>
      </div>
      <div
        class="text-[16px] justify-self-center px-10 min-[1100px]:px-0 sm:pb-12 col-start-1 col-span-2 min-[1100px]:col-start-2">
        <span v-html="descriptionText" style="white-space: pre-wrap;" class="overflow-none"></span>
      </div>
    </div>
    <img loading="lazy" :src="img" class="pt-8 w-5/6 sm:pt-12 pr-2 justify-self-end max-h-screen object-contain" />
    <div class="py-12" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    palmares: {
      type: Array,
      required: false,
      default: []
    },
    descriptionText: {
      type: String,
    },
    img: {
      type: String
    }
  },
}
</script>