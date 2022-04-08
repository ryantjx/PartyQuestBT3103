<template>
    <div id="logged" v-if="user">
        <div id="nav">
            <router-link to="/mypq/CreatedPQPage">Created PQs</router-link> |
            <router-link to="/mypq/JoinedPQPage">Joined PQs</router-link> |
            <router-link to="/mypq/SavedPQPage">Saved PQs</router-link>
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'PQNavBar',

    data() {
        return {
            user: false,
        };
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                this.user = user;
            }
        });
    },
};
</script>

<style>
#nav {
    padding: 30px;
    text-align: center;
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
}
#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
