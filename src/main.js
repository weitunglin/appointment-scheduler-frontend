import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus/lib/index.full'
import 'element-plus/lib/theme-chalk/index.css'

import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers = { 'Content-Type': 'application/json' }

const app = createApp(App).use(ElementPlus)
app.config.globalProperties.axios = axios
app.mount('#app')