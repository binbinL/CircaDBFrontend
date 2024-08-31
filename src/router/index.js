import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/Home/index.vue'
import AboutView from '../views/About/index.vue'
import GuideView from '../views/Guide/index.vue'
import ContactView from '../views/Concat/index.vue'
import DownLoadView from "../views/Download/index.vue";
import LayOut from "../views/Layout/index.vue";
import DetailsView from "../views/Details/index.vue"

import HomoView from '../views/Homo/index.vue'
import MusView from '../views/Mus/index.vue'
import TranscriptomeView from '../views/Transcriptome/index.vue'
import GEOTableView from '../views/Table/GEOTable/index.vue'

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
                    path: '/human/',
                    name: 'human',
                    component: HomoView,
                    children:[
                        {
                            path: '/human/Transcriptome',
                            component: TranscriptomeView,
                        }
                    ]
                },
                {
                    path: '/mouse/',
                    name: 'mouse',
                    component: MusView,
                },
                // {
                //     path: '/human/Transcriptome',
                //     component: TranscriptomeView,
                // }
                {
                    path: '/human/Transcriptome/:source',
                    component: GEOTableView,
                }
            ]
        }


    ]
})

export default router
