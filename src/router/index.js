import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home/index.vue'
import AboutView from '../views/About/index.vue'
import GuideView from '../views/Guide/index.vue'
import ContactView from '../views/Concat/index.vue'
import DownLoadView from "../views/Download/index.vue";
import LayOut from "../views/Layout/index.vue";
import Details from "../views/Details/index.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            alias: '/home',
            component: LayOut,
            children: [
                {
                    path: '/home',
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
                    component: GuideView,
                },
                {
                    path: '/contact',
                    name: 'contact',
                    component: ContactView,
                },
                {
                    path: '/download',
                    name: 'download',
                    component: DownLoadView,
                },
            ]
        },
        {
            path: '/gse/gene',
            component: Details,
            props: (route) => ({gse: route.query.gse, gene: route.query.gene})
        }

    ]
})

export default router
