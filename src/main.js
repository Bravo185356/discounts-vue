import { createApp } from 'vue'
import './styles/style.css'
import './styles/nullstyle.css'
import './assets/fontsicons/iconfonts.css'
import App from './App.vue'
import store from './store'
import router from './router'
import BodyScrollLock from '@/plugins/BodyScrollLock'
import VueTheMask from 'vue-the-mask'

createApp(App).use(store).use(router).use(BodyScrollLock).use(VueTheMask).mount('#app')
