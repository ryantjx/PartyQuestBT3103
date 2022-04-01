<template>
    <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
        <ul class="sidebar">
            <template v-if="user.loggedIn">
                <div class="top-left-side">
                    <Sidebar />
                    <router-link to="/home" class="navbar-brand"
                        ><span>PartyQuest</span></router-link
                    >
                </div>
            </template>
        </ul>
        <div class="container" id="topbar">
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
                <!-- <ul class="navbar-nav ms-auto">
                    <template
                        class="top-right-side"
                        v-if="loading || user.loggedIn"
                    >
                        <SearchBar />
                        <div class="nav-item-username">
                            Welcome, {{ user.data.displayName }}!
                        </div>
                        <li class="nav-item-btn">
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
                </ul> -->
                <template
                    class="top-right-side"
                    v-if="loading || user.loggedIn"
                >
                    <div class="loggedin">
                        <SearchBar />
                        <div class="nav-item-username">
                            Welcome, {{ user.data.displayName }}!
                        </div>
                        <CreatePQButton />
                    </div>
                </template>
                <template v-else>
                    <div class="nav-item">
                        <router-link to="login" class="nav-link"
                            >Login</router-link
                        >
                    </div>
                    <div class="nav-item">
                        <router-link to="register" class="nav-link"
                            >Register</router-link
                        >
                    </div>
                </template>
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
.loggedin {
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
}

.top-left-side {
    display: flex;
    align-items: center;
}

.top-right-side {
}

#topbar {
    align-items: flex-start;
}
</style>
