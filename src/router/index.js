import { createRouter, createWebHistory  } from "vue-router";
import ProfilePage from '../views/ProfilePage'
import Main from '../views/MainPage'
import NetflixSub from '../views/NetflixSub';
import YoutubeSub from '../views/YoutubeSub';
import SpotifySub from '../views/SpotifySub';

const routes = [
    { path: '/', component: Main},
    { path: "/profile/:id", component: ProfilePage, props: true },
    { path: '/netflix', component: NetflixSub},  
    { path: '/youtube', component: YoutubeSub},  
    { path: '/spotify', component: SpotifySub},  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0}
  }
});
export default router
