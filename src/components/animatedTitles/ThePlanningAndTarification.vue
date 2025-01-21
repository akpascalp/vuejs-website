<template>
  <svg v-show="screenWidth < 900" width="370" height="245" class="scale-[.65] sm:scale-100">
    <text x="0" y="65" class="text-[64px] font-title" id="planning-title-small1">
      The Planning
    </text>
    <text x="0" y="140" class="text-[64px] font-title" id="planning-title-small2">
      &
    </text>
    <text x="0" y="220" class="text-[64px] font-title" id="planning-title-small3">
      Tarification
    </text>
    <line x1="0" y1="75" x2="25" y2="75" stroke="black" stroke-width="5" opacity="0" id="planning-underline-small" />
    <line x1="0" y1="230" x2="25" y2="230" stroke="black" stroke-width="5" opacity="0" id="planning-overline-small" />
  </svg>
  <svg v-show="screenWidth >= 900" width="900" height="100">
    <text x="0" y="65" class="text-[64px] font-title" id="planning-title1">
      The Planning & Tarification
    </text>
    <line x1="0" y1="75" x2="25" y2="75" stroke="black" stroke-width="5" opacity="0" id="planning-overline" />
    <line x1="0" y1="75" x2="25" y2="75" stroke="black" stroke-width="5" opacity="0" id="planning-underline" />
  </svg>
</template>

<script>
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default {
  mounted() {
    this.updateScreenWidth()
    if (this.screenWidth < 900) {
      gsap.to("#planning-underline-small", {
        x: 158,
        opacity: 1,
        duration: 1,
        repeatRefresh: true,
        scrollTrigger: "#planning-title-small1"
      })
      gsap.to("#planning-overline-small", {
        x: 26,
        opacity: 1,
        duration: 1,
        repeatRefresh: true,
        scrollTrigger: "#planning-title-small1"
      })
    } else {
      gsap.to("#planning-overline", {
        x: 156,
        opacity: 1,
        duration: 1.5,
        repeatRefresh: true,
        scrollTrigger: "#planning-title1"
      })
      gsap.to("#planning-underline", {
        x: 420,
        opacity: 1,
        duration: 1.5,
        repeatRefresh: true,
        scrollTrigger: "#planning-title1"
      })
    }
  },
  data() {
    return {
      screenWidth: 0,
    };
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }
  },
}
</script>
