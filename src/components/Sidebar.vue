<template>
    <div>
        <b-button id="toggle" size="lg" v-b-toggle.sidebar-no-header
            >=</b-button
        >
        <b-sidebar
            id="sidebar-no-header"
            aria-labelledby="sidebar-no-header-title"
        >
            <template #default="{ hide }">
                <div class="p-3">
                    <h4 id="sidebar-no-header-title">
                        Welcome to PartyQuest!
                    </h4>
                    <nav class="mb-3">
                        <b-nav vertical>
                            <b-nav-item id="menuitem" href="home" @click="hide"
                                >Home</b-nav-item
                            >
                            <b-nav-item
                                id="menuitem"
                                href="profile"
                                @click="hide"
                                >My Profile</b-nav-item
                            >
                            <b-nav-item id="menuitem" href="pq" @click="hide"
                                >My PartyQuests</b-nav-item
                            >
                            <b-nav-item id="menuitem" href="chats" @click="hide"
                                >My Chats</b-nav-item
                            >
                            <b-nav-item
                                id="menuitem"
                                href="searchresults"
                                @click="hide"
                                >JUST FOR TESTING: Link to Search Result
                                Page</b-nav-item
                            >
                            <b-nav-item
                                id="menuitem"
                                href="pq/listing"
                                @click="hide"
                                >JUST FOR TESTING: Link to Product listing
                                page</b-nav-item
                            >
                        </b-nav>
                    </nav>
                    <br /><br />
                    <div>
                        <b-button
                            id="logout"
                            variant="primary"
                            block
                            @click.prevent="signOut"
                            >Log out</b-button
                        >
                    </div>
                </div>
            </template>
        </b-sidebar>
    </div>
</template>
<script>
import firebaseApp from '../firebase.js';
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth(firebaseApp);

export default {
    name: 'Sidebar',
    methods: {
        signOut() {
            console.log('Attempting to sign out');

            signOut(auth).then(() => {
                this.$router.replace({
                    name: 'home',
                });
            });
        },
    },
};
</script>

<style scoped>
#logout {
    color: white;
    background: red;
    bottom: 0;
    position: absolute;
    left: 0;
}

#backbutton {
    background: white;
    color: black;
}

#toggle {
    background: white;
    border: none;
    color: black;
}
</style>
