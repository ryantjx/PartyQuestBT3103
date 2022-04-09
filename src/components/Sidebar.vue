<template>
    <div>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <b-button id="toggle" size="md" v-b-toggle.sidebar-no-header>
            <!-- <i class="fa fa-bars" style="font-size:18px;"></i
        > -->
            <i class="fa fa-angle-double-right" style="font-size:28px;"></i
        ></b-button>
        <b-sidebar
            id="sidebar-no-header"
            aria-labelledby="sidebar-no-header-title"
        >
            <template #default="{  }">
                <div class="p-3">
                    <div class="logo-div">
                        <img
                            src="../assets/PartyQuest_Logo_small.png"
                            class="logo-item"
                        />
                    </div>
                    <br />
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
                                <router-link
                                    to="/mypq/CreatedPQPage"
                                    class="sidebar-rows"
                                >
                                    <i class="fa fa-group"></i
                                    ><span class="text"
                                        >My PartyQuests</span
                                    ></router-link
                                >
                            </div>
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
                    name: 'LandingPage',
                });
            });
        },
    },
};
</script>

<style scoped>
.text {
    color: grey;
    margin-inline-start: 8px;
}

.logo-div {
    display: flex;
    justify-content: center;
}

.logo-item {
    width: 135px;
    height: 100px;
    align-items: center;
}

.row {
}

.sidebar-rows {
    color: black;
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
    background: none;
    border: none;
    color: black;
}
</style>
