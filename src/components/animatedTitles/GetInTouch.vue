<template>
  <svg width="360" height="100" class="scale-[.65] sm:scale-100">
    <text x="0" y="65" class="text-[64px] font-title" id="touch-title">
      Get in Touch
    </text>
    <line x1="0" y1="75" x2="25" y2="75" stroke="black" stroke-width="5" opacity="0" id="touch-underline" />
  </svg>
</template>

<script>
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    gsap.to("#touch-underline", {
      x: 200,
      opacity: 1,
      duration: 1,
      repeatRefresh: true,
      scrollTrigger: "#touch-title"
    })
  }
}
</script>
