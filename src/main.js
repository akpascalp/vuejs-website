import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store';
import * as VueScrollTo from "vue-scrollto";
import VueMatomo from 'vue-matomo';
import matomoConfig from './matomo-config.js';
import fontMixin from './mixins/fontMixin';
import utils from './helpers/utils.js'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash
            }
        }
        document.getElementById('app').scrollIntoView();
    }
})

app.use(router)
app.use(store)
app.use(VueScrollTo)
app.use(VueMatomo, {
    host: matomoConfig.host,
    siteId: matomoConfig.siteId,
    router: router,
    enableLinkTracking: matomoConfig.enableLinkTracking,
    requireConsent: matomoConfig.requireConsent,
});

app.mixin(fontMixin);

app.mount('#app')
