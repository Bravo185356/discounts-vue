import { createApp } from 'vue'
import './styles/style.scss'
import './styles/nullstyle.css'
import './assets/fontsicons/iconfonts.css'
import App from './App.vue'
import store from './store'
import router from './router'
import BodyScrollLock from '@/plugins/BodyScrollLock'
import Maska from 'maska'

createApp(App).use(store).use(router).use(BodyScrollLock).use(Maska).mount('#app')
