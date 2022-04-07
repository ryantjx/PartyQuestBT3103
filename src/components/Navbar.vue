<template>
    <div class="navbar">
        <div class="wrapper">
            <div class="sidebar">
                <template v-if="user">
                    <div class="top-left-side">
                        <Sidebar />
                        <router-link to="/home" class="navbar-brand"
                            ><h2>PartyQuest</h2></router-link
                        >
                    </div>
                </template>
            </div>
            <div class="container">
                <div v-if="user" class="top-right-side">
                    <div class="top-right-side">
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
                </div>
                <div v-else>
                    <div class="nav-item">
                        <router-link to="aboutus" class="nav-link "
                            >About Us</router-link
                        >
                    </div>
                    <div class="nav-item">
                        <router-link to="contactus" class="nav-link "
                            >Contact Us</router-link
                        >
                    </div>
                    <div class="nav-item">
                        <router-link to="login" class="nav-link"
                            >Login</router-link
                        >
                    </div>
                    <!-- <div class="nav-item">
                        <router-link to="login" class="nav-link"
                            >Login</router-link
                        >
                    </div> -->
                    <div class="nav-item">
                        <router-link to="register" class="nav-link"
                            >Register</router-link
                        >
                    </div>
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
.navbar {
    overflow: hidden;
    position: absolute; /* Set the navbar to fixed position */
    top: 0.5vw; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

.wrapper {
    display: flex;
}

.container {
    /* background-color: green; */
}

.work {
    width: 69vw;
    justify-content: space-between;
}

.sidebar {
    width: 30vw;
    /* background: orange; */
    align-self: left;
}

.top-right-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.username-btn {
    display: flex;
    align-items: center;
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
