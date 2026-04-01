import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import axiosApi from "@/plugins/axiosApi";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axiosApi, {baseURL: 'https://www.cbr-xml-daily.ru'})

app.mount('#app')
