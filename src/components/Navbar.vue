<template>
    <div class="navbar">
        <div class="wrapper">
            <div v-if="user" class="logged-in-nav">
                <div class="top-left-side">
                    <Sidebar />
                    <router-link to="/home" class="navbar-brand"
                        ><img
                            src="../assets/PartyQuest_Logo_small.png"
                            class="logo-item"
                            width="100px"
                    /></router-link>
                </div>
                <div class="nav-bar-search">
                    <SearchBar />
                </div>
                <div class="username-btn">
                    <div class="nav-item-username">
                        Welcome, {{ this.user.displayName }}!
                    </div>
                    <div class="create-pq-btn">
                        <CreatePQButton />
                    </div>
                </div>
            </div>

            <div v-else class="logged-out-view">
                <router-link to="/" class="logged-out-nav">
                    <h2 class="logged-out-header">PartyQuest</h2>
                </router-link>
                <div class="sticky-routes">
                    <router-link to="aboutus" class="logged-out-nav"
                        >About Us</router-link
                    >
                    <router-link to="contactus" class="logged-out-nav"
                        >Contact Us</router-link
                    >
                    <router-link to="login" class="logged-out-nav"
                        >Login</router-link
                    >
                    <router-link to="register" class="logged-out-nav"
                        >Register</router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from './Sidebar.vue';
import CreatePQButton from '../components/Buttons/CreatePQButton.vue';
import SearchBar from '../components/SearchBar.vue';
import firebaseApp from '../firebase.js';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default {
    data() {
        return {
            user: null,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            this.user = user;
        });
    },
    components: {
        Sidebar,
        CreatePQButton,
        SearchBar,
    },
    methods: {
        signOut() {
            console.log('Attempting to sign out');
            var currentUser = auth.currentUser;

            console.log(currentUser.displayName);

            signOut(auth, currentUser).then(() => {
                console.log('attempting to redirect!');
                this.$router.replace({ name: 'LandingPage' }).catch(() => {});
            });
        },
    },
};
</script>

<style scoped>
.logo {
    width: 48px;
    height: 48px;
}

.logged-in-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* background: pink; */
}

.logged-out-nav {
    color: black;
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 16px;
    font-size: large;
    align-items: center;
}

.logged-out-nav:hover {
    text-decoration: none;
}

.navbar {
    overflow: hidden;
    position: absolute; /* Set the navbar to fixed position */
    top: 0.5vh; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

.logged-out-view {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.logged-out-top-left {
    display: flex;
}

.wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.sidebar {
}

.nav-bar-search {
    position: absolute;
    left: 32vw;
    right: 32vw;
}

.username-btn {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.logged-out-header {
    text-decoration: none;
}

.nav-item-username {
    /* width: 10vw; */
    margin-inline-end: 16px;
    backdrop-filter: blur(10px);
}

.nav-item {
    align-content: left;
}

.navbar-brand {
    margin-inline-start: 8px;
}

.top-left-side {
    display: flex;
    align-items: center;
}
</style>
