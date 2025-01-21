import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_CMS_PATH}`,
  params: {
    locale: Cookies.get('language') || 'en', // default language
  },
});

Axios.interceptors.request.use(
  config => {
    if (config.params && config.params.locale === 'en') {
      delete config.params.locale; // Delete locale param if it's 'en'
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default Axios;
