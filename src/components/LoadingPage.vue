<template>
  <div class="flex flex-row items-center">
    <div class="w-[120px] text-[16px] flex justify-center items-center">{{ loadingStatus }}%</div>
    <div class="flex flex-col h-screen">
      <div class="w-[2px] bg-black" id="progressBar"></div>
      <div class="w-[1px] bg-gray-300" id="progressBar2"></div>
    </div>
    <div class="flex justify-center items-center h-screen w-screen">
      <img src="/CLUB.svg" class="w-40" />
    </div>
  </div>
</template>
  
<script>

export default {
  name: "LoadingPage",
  props: {
    loadingStatus: {
      type: Number,
      required: true
    }
  },
  watch: {
    loadingStatus(oldValue, newValue) {
      let el = document.getElementById("progressBar")
      let height = Math.floor(window.innerHeight * newValue / 100);
      let el2 = document.getElementById("progressBar2")
      let height2 = Math.floor(window.innerHeight - height);
      el.style.height = height + "px"
      el2.style.height = height2 + "px"
    }
  }
}
</script>
