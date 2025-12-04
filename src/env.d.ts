import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css' // 없으면 이 줄은 제거해도 됨

createApp(App).use(createPinia()).use(router).mount('#app')
