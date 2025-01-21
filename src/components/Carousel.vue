<template>
  <div class="relative mx-2 sm:mx-24 py-12 h-[60vh] sm:h-[95vh]">
    <div @mousedown="startDragging" @touchstart="startDragging" @mousemove="handleDragging" @touchmove="handleDragging"
      @mouseup="stopDragging" @touchend="stopDragging">
      <div v-for="(image, index) in images" :key="index"
        class="transition-opacity duration-150 ease-in mx-24 bg-neutral-300"
        :class="index === current ? 'opacity-1' : 'opacity-0'">
        <img loading="lazy" :src="image.path" :alt="image.alt"
          class="object-contain sm:h-[80vh] absolute left-0 right-0 m-auto">
      </div>
      <div class="absolute bottom-0 inset-x-0 carousel-indicator">
        <span v-for="(image, index) in images" :key="index" class="indicator-dot"
          :class="(index === current) ? 'active' : ''" @click="goToImage(index)"></span>
      </div>
    </div>
    <div class="hidden sm:block">
      <button @click="prev"
        class="absolute top-1/2 -left-20 xl:left-0 m-4 opacity-50 hover:opacity-100 ease-in duration-100">
        <svg width="55" height="55" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="35" fill="black" />
          <path d="M29 31V34H45V36H29V39L25 35L29 31Z" fill="white" />
        </svg>
      </button>
      <button @click="next"
        class="absolute top-1/2 -right-20 xl:right-0 m-4 opacity-50 hover:opacity-100 ease-in duration-100">
        <svg width="55" height="55" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="35" fill="black" />
          <path d="M41 31V34H25V36H41V39L45 35L41 31Z" fill="white" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    images: {
      type: Array,
      required: false,
      default: []
    }
  },
  data() {
    return {
      current: 0,
      isDragging: false,
      dragStartX: 0,
      dragDistanceThreshold: 50
    }
  },
  created() {
    // const intervalleEnMillisecondes = 5000;
    // const intervalId = setInterval(this.next, intervalleEnMillisecondes);
  },
  methods: {
    next() {
      this.current = (this.current + 1) % this.images.length
    },
    prev() {
      this.current = (this.current - 1 + this.images.length) % this.images.length
    },
    startDragging(event) {
      this.isDragging = true;
      this.dragStartX = event.clientX || event.touches[0].clientX;
    },
    handleDragging(event) {
      if (!this.isDragging) return;

      const currentX = event.clientX || event.touches[0].clientX;
      const deltaX = currentX - this.dragStartX;

      if (deltaX > this.dragDistanceThreshold) {
        this.isDragging = false;
        this.scrollToPrevious();
      } else if (deltaX < -this.dragDistanceThreshold) {
        this.isDragging = false;
        this.next();
      }
    },
    stopDragging() {
      this.isDragging = false;
    },
    scrollToPrevious() {
      if (this.current > 0) {
        this.current--;
      }
    },
    goToImage(index) {
      this.current = index;
    }
  }
}
</script>

<style>
.carousel-indicator {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccccccbf;
  margin: 0 4px;
  cursor: pointer;
}

.indicator-dot.active {
  background-color: #33333386;
}
</style>