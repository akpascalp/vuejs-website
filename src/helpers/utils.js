import store from '@/store';
import Axios from '@/service/index.js'
import config from '@/config';

export default {
  toTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  },
  changeLanguage(lang) {
    store.dispatch('updateLanguage', lang);
    Axios.defaults.params.locale = lang;
    window.location.reload();
  },
  isVertical() {
    return window.innerWidth / window.innerHeight < 1;
  },
}
