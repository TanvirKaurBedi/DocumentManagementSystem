import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
import File_Management from "../views/File_Management.vue"

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
        path: "/file_management",
        name: "file_management",
        meta: { requiresAuth: false, title: "File Management", show_back_btn: false },
        component: File_Management,
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
