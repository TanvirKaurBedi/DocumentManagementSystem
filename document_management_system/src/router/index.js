import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"

Vue.use(VueRouter)
const routes = [
    // before login
    {
        path: "/",
        name: "login",
        meta: { requiresAuth: false, title: "Login", show_back_btn: false },
        component: Login,
    },
    {
        path: "/",
        name: "file_management_page",
        meta: { requiresAuth: false, title: "File Management", show_back_btn: false },
        component: Login,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    router
})
export default router;
