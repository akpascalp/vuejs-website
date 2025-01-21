<template>
  <DisciplineLayout :data="data" planningKey="Sport">
    <template #title>
      <Sport />
    </template>
  </DisciplineLayout>
</template>

<script>
import DisciplineLayout from '@/layouts/DisciplineLayout.vue';
import Sport from '@/components/animatedTitles/Sport.vue';
import Axios from '@/service/index.js'

export default {
  components: {
    DisciplineLayout,
    Sport
  },
  data() {
    return {
      data: null
    }
  },
  beforeCreate() {
    Axios
      .get('/club/disciplines/1')
      .then(res => {
        this.data = res.data;
      })
  },
}

</script>