import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
// import LandingPage from '../views/LandingPage.vue';
import Dashboard from '../components/Dashboard.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    // {
    //     path: '/landingpage',
    //     name: 'Landing',
    //     component: LandingPage,
    // },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
