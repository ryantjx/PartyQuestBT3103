<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <ul class="navbar-nav ml-auto">
            <template v-if="user.loggedIn">
                <Sidebar />
            </template>
        </ul>
        <div class="container" id="topbar">
            <router-link to="/home" class="navbar-brand"
                >PartyQuest</router-link
            >
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto"></ul>
                <ul class="navbar-nav ml-auto">
                    <template v-if="user.loggedIn">
                        <SearchBar />
                        <div class="nav-item">{{ user.data.displayName }}</div>
                        <li class="nav-item">
                            <CreatePQButton />
                        </li>
                    </template>
                    <template v-else>
                        <li class="nav-item">
                            <router-link to="login" class="nav-link"
                                >Login</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link to="register" class="nav-link"
                                >Register</router-link
                            >
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import Sidebar from './Sidebar.vue';
import CreatePQButton from '../components/Buttons/CreatePQButton.vue';
import SearchBar from '../components/SearchBar.vue';
import { mapGetters } from 'vuex';
import firebaseApp from '../firebase.js';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default {
    computed: {
        //The mapGetters helper simply maps store getters to local computed properties:
        ...mapGetters({
            // map `this.user` to `this.$store.getters.user`
            user: 'user',
        }),
    },
    components: {
        Sidebar,
        CreatePQButton,
        SearchBar,
    },
    methods: {
        signOut() {
            console.log('Attempting to sign out');
            var username = this.$store.getters.user.loggedIn;

            console.log(username);

            signOut(auth).then(() => {
                this.$router.replace({
                    name: 'Home',
                });
            });
        },
    },
};
</script>

<style scoped>
#topbar {
    align-items: flex-start;
}
</style>
