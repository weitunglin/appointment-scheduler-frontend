import * as moment from 'moment'
import App from './App.vue'
import { createApp } from 'vue'

import ElementPlus from 'element-plus/lib/index.full'
import 'element-plus/lib/theme-chalk/index.css'

import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_URL
axios.defaults.headers = { 'Content-Type': 'application/json' }

import { createI18n } from 'vue-i18n'
const i18n = createI18n({
locale: 'zh-tw',
  messages: {
    'zh-tw': {
      login: '登入',
      logout: '登出',
      refresh: '重新整理',
      studentID: '學號',
      name: '姓名',
      class: '班級',
      time: '時間',
      status: '狀態',
      book: '預約 ！',
      appointment: '已預約',
      studentIDRequired: '學號必填'
    },
    en: {
      login: 'Login',
      logout: 'Log Out',
      refresh: 'Refresh',
      studentID: 'Student ID',
      name: 'Name',
      class: 'Class',
      time: 'Time',
      status: 'Status',
      book: 'Book !',
      appointment: 'Appointment',
      studentIDRequired: 'Student ID is required'
    }
  }
})


const app = createApp(App).use(ElementPlus).use(i18n)
app.config.globalProperties.moment = moment
app.config.globalProperties.axios = axios
app.mount('#app')