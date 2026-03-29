import '@/assets/style/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import axiosApi from "@/plugins/axiosApi";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axiosApi)


app.mount('#app')
