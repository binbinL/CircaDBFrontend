import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home/index.vue'
import AboutView from '../views/About/index.vue'
import GuideView from '../views/Guide/index.vue'
import ContactView from '../views/Concat/index.vue'
import DownLoadView from "../views/Download/index.vue";
import LayOut from "../views/Layout/index.vue";
import DetailsView from "../views/Details/index.vue"


import SpeciesView from '../views/Species/index.vue'
import OmicsView from '../views/Omics/index.vue'
import GEOTableView from '../views/Table/GEOTable/index.vue'
import GeneTableView from '../views/Table/GeneTable/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
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
                {
                    path: '/details',
                    component: DetailsView,
                    props: (route) => ({species: route.query.species, gse: route.query.gse, gene: route.query.gene})
                },

                {
                    path: '/:species',
                    name: 'species',
                    component: SpeciesView,
                    children: [
                        {
                            path: '/:species/:omics',
                            component: OmicsView,
                            // meta: {
                            //     keepAlive: false,
                            // },
                        }
                    ]
                },
                {
                    path: '/:species/:omics/:source',
                    component: GEOTableView,
                },
                {
                    path: '/:species/:omics/:source/:gene',
                    component: GeneTableView,
                },
                {
                    path: '/details/:species/:omics/:geo/:gene',
                    component: DetailsView,
                }
            ]
        }


    ]
})

export default router
