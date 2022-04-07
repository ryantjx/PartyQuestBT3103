<template>
    <div class="navbar">
        <div class="wrapper">
            <div v-if="user" class="logged-in-nav">
                <div class="top-left-side">
                    <Sidebar />
                    <router-link to="/home" class="navbar-brand"
                        ><h2>PartyQuest</h2></router-link
                    >
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

            <div v-else-if="user === null" class="logged-out-view">
                <h2>test</h2>
                <router-link to="aboutus" class="nav-link "
                    >About Us</router-link
                >
                <router-link to="contactus" class="nav-link "
                    >Contact Us</router-link
                >
                <router-link to="login" class="nav-link">Login</router-link>
                <router-link to="register" class="nav-link"
                    >Register</router-link
                >
            </div>

            <div v-else>
                <h2>nothin</h2>
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

.navbar {
    overflow: hidden;
    position: absolute; /* Set the navbar to fixed position */
    top: 0.5vw; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

.logged-out-view {
    /* background-color: green; */
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

.nav-item-username {
    width: 10vw;
}

.nav-item {
    align-content: left;
}

.navbar-brand {
    margin-inline-start: 32px;
    color: black;
}

.top-left-side {
    display: flex;
    align-items: center;
}
</style>
