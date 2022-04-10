import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/landing_page/Login.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import CreatePQ from '../views/CreatePQ.vue';
import ProfilePage from '../views/ProfilePage';
import MyPQPage from '../views/MyPQPage';
import SavedPQPage from '../views/SavedPQPage';
import CreatedPQPage from '../views/CreatedPQPage';
import JoinedPQPage from '../views/JoinedPQPage';
import SearchResultsPage from '../views/SearchResultsPage';
import SearchResultPQ from '../components/SearchResultPQ';
import SearchResultUser from '../components/SearchResultUser';
import EditProfilePage from '../views/EditProfilePage';
import OtherUserProfile from '../views/OtherUserProfilePage';
import AboutUs from '../components/landing_page/AboutUs';
import ContactUs from '../components/landing_page/ContactUs';
import LandingPage from '../views/LandingPage';
import PqDetailsPage from '../views/PqDetailsPage';
import NotFoundPage from '../views/NotFound';
import ResetPasswordPage from '../components/landing_page/ResetPassword';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'LandingPage',
        component: LandingPage,
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
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/create',
        name: 'CreatePQ',
        component: CreatePQ,
    },
    {
        path: '/profile',
        name: 'ProfilePage',
        component: ProfilePage,
    },
    {
        path: '/profile/user/:id',
        name: 'OtherUserProfile',
        component: OtherUserProfile,
    },
    {
        path: '/editProfile',
        name: 'EditProfilePage',
        component: EditProfilePage,
    },
    {
        path: '/pq',
        name: 'PartyQuest',
        component: MyPQPage,
    },
    {
        path: '/mypq',
        name: 'MyPQPage',
        component: MyPQPage,
    },
    {
        path: '/mypq/SavedPQPage',
        name: 'SavedPQPage',
        component: SavedPQPage,
    },
    {
        path: '/mypq/JoinedPQPage',
        name: 'JoinedPQPage',
        component: JoinedPQPage,
    },
    {
        path: '/mypq/CreatedPQPage',
        name: 'CreatedPQPage',
        component: CreatedPQPage,
    },
    {
        path: '/searchresults',
        name: 'SearchResults',
        component: SearchResultsPage,
    },
    {
        path: '/searchresults/pq',
        name: 'SearchResultPQ',
        component: SearchResultPQ,
    },
    {
        path: '/searchresults/user',
        name: 'SearchResultUser',
        component: SearchResultUser,
    },
    {
        path: '/pq/:id',
        name: 'PQDetails',
        component: PqDetailsPage,
    },
    {
        path: '/resetpassword',
        name: 'ResetPW',
        component: ResetPasswordPage,
    },
    {
        path: '/aboutus',
        name: 'AboutUs',
        component: AboutUs,
    },
    {
        path: '/contactus',
        name: 'ContactUs',
        component: ContactUs,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
