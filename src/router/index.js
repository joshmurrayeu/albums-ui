import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/album/:id',
        name: 'view-album',
        component: () => import(/* webpackChunkName: "view-album" */ '../views/albums/AlbumView.vue')
    },
    {
        path: '/user/:id',
        name: 'view-user',
        component: () => import(/* webpackChunkName: "view-user" */ '../views/users/UserView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
