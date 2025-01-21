import config from '@/config';

export default {
  mounted() {
    document.body.style.fontFamily = config.fontFamily.value;
  }
};
