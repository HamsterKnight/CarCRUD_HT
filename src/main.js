/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

import element from 'element-ui'
Vue.use(element)
// 配置axios全局
// axios.defaults.baseURL = 'http://192.168.0.115:3000/ht'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
// 全局配置axios
Vue.prototype.axios = axios

// 引入富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
