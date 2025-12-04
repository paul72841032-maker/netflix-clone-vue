import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Popular from '../views/Popular.vue'
import Search from '../views/Search.vue'
import Wishlist from '../views/Wishlist.vue'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_BASE || '/'),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/popular', name: 'popular', component: Popular },
        { path: '/search', name: 'search', component: Search },
        { path: '/wishlist', name: 'wishlist', component: Wishlist },
        { path: '/signin', name: 'signin', component: SignIn },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ],
    scrollBehavior() { return { top: 0 } }
})

export default router
