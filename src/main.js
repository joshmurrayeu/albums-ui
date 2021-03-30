import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './stylesheets/app.scss'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';