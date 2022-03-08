import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../views/Home.vue';
import Dashboard from '../components/Dashboard.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '',
        component: Home,
    },
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
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
