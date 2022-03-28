<template>
    <div class="col-lg-8">
        <h1>This is the My Joined PQ Page</h1>
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <div class="my-listings margin-bottom-none">
            <div v-if="isEmptyList()">
                <h1>There are no partyquest data</h1>
            </div>
            <div v-else>
                <PartyQuestList :partyQuestData="items" v-if="items" />
            </div>
            <!-- need to test if there are no partyquest data for the user what will happen -->
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

const db = getFirestore(firebaseApp);

export default {
    name: 'JoinedPQPage',
    data() {
        return {
            items: null,
            user: null,
        };
    },
    components: {
        PartyQuestList,
    },
    methods: {
        isEmptyList() {
            return this.items == null || this.items.length == 0;
        },
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
            // To be changed!!!
            var q = query(
                pqRef,
                where('participants', 'array-contains', user.displayName)
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
