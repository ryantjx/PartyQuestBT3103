<template>
    <div class="centre">
        <PQNavBar />
        <div class="padding-top-2x mt-2 hidden-lg-up"></div>
        <div class="my-listings margin-bottom-none">
            <div v-if="isNotLoaded()">
                <div class="loader"></div>
            </div>
            <div v-else-if="isEmptyList()">
                <h1>
                    Your PartyQuest History is empty.<br />
                    Start one now!
                </h1>
            </div>
            <div v-else>
                <PartyQuestList :partyQuestData="items" v-if="items" />
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
import PQNavBar from '../components/PQNavBar.vue';
import store from '../store.js';

const db = getFirestore(firebaseApp);

export default {
    name: 'CreatedPQPage',
    data() {
        return {
            items: null,
            user: null,
        };
    },
    components: {
        PartyQuestList,
        PQNavBar,
    },
    methods: {
        isNotLoaded() {
            return this.items == null;
        },
        isEmptyList() {
            console.log(
                'Print items passed into the partyquests profile : ',
                this.items
            );
            return this.items != null && this.items.length == 0;
        },
        async passListasData(newItem) {
            // Reassign items to the loaded list
            // Ensure that this.items is not a promise
            this.items = await newItem;
        },
        async getData(user) {
            // console.log(
            //     'User display name obtained for obtain pq list ',
            //     user.displayName
            // );
            var pqRef = collection(db, 'PartyQuests');
            // To be changed!!!
            // Should be partyquests that are 'in Progress' and created by user
            // Query all status that is not 'Completed'
            var q = query(
                pqRef,
                where('status', '!=', 'Completed'),
                where('groupCreatorid', '==', user.displayName)
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
                pqMap['photoId'] = pq['photoId'];
                pqMap['description'] = pq['description'];
                pqMap['requirements'] = pq['requirements'];
                pqMap['groupCreatorid'] = pq['groupCreatorid'];
                pqMap['numOfPeople'] = pq['numOfPeople'];
                pqMap['collectionLocation'] = pq['collectionLocation'];
                pqMap['endDate'] = pq['endDate'];
                pqMap['status'] = pq['status'];
                pqMap['id'] = docs.id;
                //Push map into array
                itemsList.push(pqMap);
            });
            return itemsList;
        },
    },
    mounted() {
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

.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: auto;
}

.center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
