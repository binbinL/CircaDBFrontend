import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GuideView from '../views/GuideView.vue'
import ContactView from '../views/ContactView.vue'
import DownLoadView from "@/views/DownLoadView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            alias: '/home',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        },
        {
            path: '/guide',
            name: 'guide',
            component: GuideView
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView
        },
        {
            path: '/download',
            name: 'download',
            component: DownLoadView
        },

    ]
})

export default router
