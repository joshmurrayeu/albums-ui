import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFormulate from '@braid/vue-formulate'

import './stylesheets/app.scss'

Vue.config.productionTip = false

Vue.use(VueFormulate)

const axios = require('axios').create({
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
    },
});

Vue.prototype.axios = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')