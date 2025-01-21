<template>
  <!-- <LoadingPage v-if="isLoading" class="z-1" :loadingStatus="loadingStatus"/> -->
  <div class="flex flex-col">
    <div class="flex flex-col">
      <SiteSidebar />
      <main class="pt-20 sm:pt-0 sm:pl-[120px] z-0">
        <router-view />
      </main>
    </div>
    <SiteFooter class="sm:pl-[120px]" />
  </div>
</template>

<script>
import SiteFooter from '@/layouts/partials/Footer.vue'
import SiteSidebar from '@/layouts/partials/Sidebar.vue'
import store from '@/store';
import Axios from '@/service/index.js'
// import LoadingPage from '@/components/LoadingPage.vue'

export default {
  name: "LayoutDefault",
  components: { SiteFooter, SiteSidebar },
  data() {
    return {
      // isLoading: true,
      // loadingStatus: 0,
      // tempInterval: null
    }
  },
  mounted() {
    Axios
      .get("/contentmanager/data")
      .then(res => {
        store.dispatch('updateContentData', res.data);
      })

    // this.tempInterval = setInterval(this.updateStatus, 10);
  },
  methods: {
    //   updateStatus() {
    //     this.loadingStatus++;
    //     if (this.loadingStatus >= 100) {
    //       this.isLoading = false;
    //       clearInterval(this.tempInterval);
    //     }
    //   }
  }
}
</script>