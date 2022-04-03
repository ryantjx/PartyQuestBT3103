<template>
    <div class="navbar">
        <div class="sidebar">
            <template v-if="user.loggedIn">
                <div class="top-left-side">
                    <Sidebar />
                    <router-link to="/home" class="navbar-brand"
                        ><h2>PartyQuest</h2></router-link
                    >
                </div>
            </template>
        </div>
        <div class="container" id="topbar">
            <template v-if="loading || user.loggedIn">
                <div class="top-right-side">
                    <SearchBar />
                    <div class="nav-item-username">
                        Welcome, {{ user.displayName }}!
                    </div>
                    <CreatePQButton />
                </div>
            </template>
            <template v-else>
                <div class="nav-item">
                    <router-link to="login" class="nav-link">Login</router-link>
                </div>
                <div class="nav-item">
                    <router-link to="register" class="nav-link"
                        >Register</router-link
                    >
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import Sidebar from './Sidebar.vue';
import CreatePQButton from '../components/Buttons/CreatePQButton.vue';
import SearchBar from '../components/SearchBar.vue';
import { mapGetters } from 'vuex';
import firebaseApp from '../firebase.js';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export default {
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, loading => {
            if (loading) {
                this.loading = !loading;
            }
        });
    },
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
.navbar {
    overflow: hidden;
    position: absolute; /* Set the navbar to fixed position */
    top: 0.5vw; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
}

.container {
    /* background-color: black; */
    width: 50vw;
}

.sidebar {
    /* background-color: black; */
}

.top-right-side {
    display: flex;
    align-items: center;
}

.nav-item-username {
    width: 10vw;
}

.nav-item-btn {
    display: flex;
    align-items: flex-end;
}

.navbar-brand {
    margin-inline-start: 32px;
    color: black;
}

.top-left-side {
    display: flex;
    align-items: center;
}

.top-right-side {
}

#topbar {
    align-items: space-between;
}
</style>
