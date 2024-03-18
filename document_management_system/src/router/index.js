import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login.vue"
import File_Management from "../views/File_Management.vue"
import Documents_Search from "../views/Documents_Search.vue"

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
        meta: { requiresAuth: true, title: "File Management", show_back_btn: false },
        component: File_Management,
    },
    {
        path: "/search_documents",
        name: "search_documents",
        meta: { requiresAuth: true, title: "File Management", show_back_btn: false },
        component: Documents_Search,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

// new Vue({
//     router
// })
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem("access_token");
    if (to.meta.requiresAuth === true && !token) {
        router.push({ name: "login" });
    } 
    else next();
});
export default router;
