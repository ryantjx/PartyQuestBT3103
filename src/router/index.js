import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
// import LandingPage from '../views/LandingPage.vue';
import Dashboard from '../components/Dashboard.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import CreatePQ from '../views/CreatePQ.vue';
import ProfilePage from '../views/ProfilePage';
import MyPQPage from '../views/MyPQPage';
import ChatsPage from '../views/ChatsPage';
import SavedPQ from '../components/SavedPQ';
import CreatedPQ from '../components/CreatedPQ';
import PqDetails from '../views/PqListingPage';
import JoinedPQPage from '../views/JoinedPQPage';
import SearchResultsPage from '../views/SearchResultsPage';
import SearchResultPQ from '../components/SearchResultPQ';
import SearchResultUser from '../components/SearchResultUser';
import EditProfilePage from '../views/EditProfilePage';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '',
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
        path: '/profile/editprofile',
        name: 'EditProfilePage',
        component: EditProfilePage,
    },
    {
        path: '/pq',
        name: 'PartyQuest',
        component: MyPQPage,
    },
    {
        path: '/chats',
        name: 'ChatsPage',
        component: ChatsPage,
    },
    {
        path: '/mypq',
        name: 'MyPQPage',
        component: MyPQPage,
    },
    {
        path: '/mypq/saved',
        name: 'SavedPQ',
        component: SavedPQ,
    },
    {
        path: '/mypq/JoinedPQPage',
        name: 'JoinedPQPage',
        component: JoinedPQPage,
    },
    {
        path: '/mypq/created',
        name: 'CreatedPQ',
        component: CreatedPQ,
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
        path: '/pq/listing',
        name: 'Pq Details',
        component: PqDetails,
    },
    // {
    //     path: '/pq/:pqId',
    //     name: 'PQ Details',
    //     component: PQDetails,
    //     props: true,
    // },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
