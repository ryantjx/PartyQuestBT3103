<template>
    <div>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <b-button id="toggle" size="md" v-b-toggle.sidebar-no-header
            ><i class="fa fa-bars"></i
        ></b-button>
        <b-sidebar
            id="sidebar-no-header"
            aria-labelledby="sidebar-no-header-title"
        >
            <template #default="{  }">
                <div class="p-3">
                    <h4 id="sidebar-no-header-title">
                        Welcome to PartyQuest!
                    </h4>
                    <nav class="mb-3">
                        <b-nav vertical>
                            <div class="row">
                                <router-link to="/home" class="sidebar-rows">
                                    <i class="fa fa-home"></i>
                                    <span class="text">Home</span></router-link
                                >
                            </div>
                            <div class="row">
                                <router-link to="/profile" class="sidebar-rows">
                                    <i class="fa fa-id-card"></i
                                    ><span class="text"
                                        >My Profile</span
                                    ></router-link
                                >
                            </div>
                            <div class="row">
                                <router-link to="/pq" class="sidebar-rows">
                                    <i class="fa fa-group"></i
                                    ><span class="text"
                                        >My PartyQuests</span
                                    ></router-link
                                >
                            </div>
                            <div class="row">
                                <router-link to="/chats" class="sidebar-rows">
                                    <i class="fa fa-comments"></i
                                    ><span class="text"
                                        >My Chats</span
                                    ></router-link
                                >
                            </div>
                            <div class="row">
                                <router-link to="/test" class="sidebar-rows">
                                    <i class="fa fa-comments"></i
                                    ><span class="text"
                                        >testing</span
                                    ></router-link
                                >
                            </div>
                            <!-- <b-nav-item id="menuitem" href="home" @click="hide"
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
                            > -->
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
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');

.hamburger {
    background-blend-mode: lighten;
}

.text {
    color: grey;
    margin-inline-start: 8px;
}

.row {
}

.sidebar-rows {
    color: black;
    font-family: 'PT Serif', serif;
    /* justify-content: space-between; */
    margin-block-start: 16px;
    margin-block-end: 16px;
    margin-inline-start: 16px;
    font-size: large;
}

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
