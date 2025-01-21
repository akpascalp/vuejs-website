import { createStore } from 'vuex';
import Cookies from 'js-cookie';

const store = createStore({
  state: {
    contentData: {},
    language: Cookies.get('language') || 'en', // default language
    languageList: [{code: 'en', text: 'English'}, {code: 'vn', text: 'Tiếng Việt'}]
  },
  mutations: {
    setLanguage(state, language) {
      state.language = language;
      Cookies.set('language', language);
    },
    setContentData(state, data) {
      state.contentData = data;
    }
  },
  actions: {
    updateLanguage({ commit }, language) {
      commit('setLanguage', language);
    },
    updateContentData({ commit }, data) {
      commit('setContentData', data);
    }
  },
  getters: {
    currentLanguage(state) {
      return state.language;
    },
    languageList(state) {
      return state.languageList;
    },
    contentData(state) {
      return state.contentData;
    }
  },
});

export default store;
