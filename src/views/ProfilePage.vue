<template>
    <div class="container">
        <div class="row gutters">
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="account-settings">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                        alt="Maxwell Admin"
                                    />
                                </div>
                                <h5 class="user-name" v-if="user">
                                    {{ this.user.displayName }}
                                </h5>
                                <h6 class="user-email" v-if="user">
                                    {{ user.email }}
                                </h6>
                            </div>
                            <div class="about">
                                <h5>About</h5>
                                <p>
                                    I'm Yuki. Full Stack Designer I enjoy
                                    creating user-centric, delightful and human
                                    experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                <!-- Wishlist Table-->
                <div class="my-listings margin-bottom-none">
                    <h1>My Listings</h1>
                    <!-- <PartyQuestList :listdata="items" /> -->
                    <!-- only display if isCreated=true -->
                    <PartyQuestList :partyQuestData="items" v-if="items" />
                    <div v-else>
                        <h1>There are no partyquest data</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PartyQuestList from '../components/PartyQuestList.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../store.js';
// import Vue from 'vue';

const db = getFirestore(firebaseApp);

// Vue.forceUpdate();

export default {
    data() {
        console.log('creattion of data');
        return {
            isCreated: false,
            items: null,
            user: null,
        };
    },
    components: {
        PartyQuestList,
    },
    methods: {
        async passListasData(newItem) {
            // Reassign items to the loaded list
            // Ensure that this.items is not a promise
            this.items = await newItem;
        },
        async getData(user) {
            console.log(
                'User display name obtained for obtain pq list ',
                user.displayName
            );
            var pqRef = collection(db, 'PartyQuests');
            var q = query(
                pqRef,
                where('groupCreatorId', '==', user.displayName)
            );

            var querySnapshotPQ = await getDocs(q);
            var itemsList = [];

            querySnapshotPQ.forEach(docs => {
                var pq = docs.data();
                var pqMap = {};

                pqMap['brand'] = pq['brand'];
                pqMap['totalAmount'] = pq['totalAmount'];
                pqMap['itemLink'] = pq['itemLink'];
                pqMap['status'] = pq['status'];
                pqMap['title'] = pq['title'];
                pqMap['participants'] = pq['participants'];
                //Push map into array
                itemsList.push(pqMap);
            });
            return itemsList;
        },
    },
    mounted() {
        console.log('mounted phase');
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, user => {
            // upon getting user data
            // get user name
            // call this.getData with user passed as input
            // call this.passListasData to reassign the data, forcing the component to re-render
            // https://michaelnthiessen.com/key-changing-technique/
            store.dispatch('fetchUser', user);
            if (user != null) {
                console.log(
                    'user name is passed and obtained:',
                    user.displayName
                );
                this.user = user;
                var completedList = [];
                completedList = this.getData(this.user);
                console.log('completed list ', completedList);
                this.passListasData(completedList);
            }
        });
    },
};
</script>

<style>
body {
    margin: 0;
    padding-top: 40px;
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
}
.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}
.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
    color: #9fa8b9;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 0.825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
</style>
