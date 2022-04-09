<template>
    <!-- Display Top Products -->
    <div class="home-container">
        <h1 style="font-size:60px;">Explore PartyQuests</h1>
        <br /><br />
        <div v-if="isNotLoaded()">
            <div class="loader"></div>
        </div>
        <div v-else-if="isEmptyList()">
            <h1>
                There are no existing PartyQuests available to join.<br />
                Start one now!
            </h1>
        </div>
        <div v-else>
            <PQBox
                :partyQuestData="existingPQs"
                v-if="existingPQs.length > 0"
            />
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../store.js';

import PQBox from '../components/home_page/PQBox.vue';

const db = getFirestore(firebaseApp);

export default {
    name: 'Home',
    components: {
        PQBox,
    },
    data() {
        return {
            existingPQs: null,
        };
    },
    methods: {
        isNotLoaded() {
            return this.existingPQs == null;
        },
        isEmptyList() {
            console.log(
                'Print items passed into the partyquests profile : ',
                this.existingPQs
            );
            return this.existingPQs != null && this.existingPQs.length == 0;
        },
        async passListasData(newItem) {
            // Reassign items to the loaded list
            // Ensure that this.items is not a promise
            console.log('type of new item : ', typeof newItem);
            var array = JSON.parse(JSON.stringify(newItem));
            this.existingPQs = array;
            console.log('passing list as data', this.existingPQs);
        },
        async getData(user) {
            console.log(
                'User display name obtained for obtain pq list ',
                user.displayName
            );
            var pqRef = collection(db, 'PartyQuests');

            // Query all PQs that user is not in and is not completed
            // FUCKING NOT WORKING DOG
            var q = query(
                pqRef,
                where('status', '!=', 'Completed')
                // where('groupCreatorid', '!=', user.displayName)
            );

            var querySnapshotPQ = await getDocs(q);
            var itemsList = [];

            querySnapshotPQ.forEach(docs => {
                var pq = docs.data();
                var pqMap = {};

                // console.log(pq['participants']);

                // Only add if participants does not contain the user
                if (!pq['participants'].includes(user.displayName)) {
                    pqMap['brand'] = pq['brand'];
                    pqMap['totalAmount'] = pq['totalAmount'];
                    pqMap['itemLink'] = pq['itemLink'];
                    pqMap['status'] = pq['status'];
                    pqMap['title'] = pq['title'];
                    pqMap['description'] = pq['description'];
                    pqMap['participants'] = pq['participants'];
                    pqMap['photoId'] = pq['photoId'];
                    pqMap['id'] = docs.id;

                    //Push map into array
                    itemsList.push(pqMap);
                }
            });
            // console.log('this is the items list passed', itemsList);
            console.log('type of existing pqs at get data: ', itemsList);
            console.log('Json Stringify :', JSON.stringify(itemsList));
            this.existingPQs = itemsList;
            // return itemsList;
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
                this.getData(this.user);
                // .then(value => {
                //     console.log('this is the completed list in mounted', value);
                //     console.log('type of mounted value : ', typeof value);
                //     this.passListasData(value);
                // });
            }
        });
    },
};
</script>

<style scoped>
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin: auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.home-container {
    width: 100%;
}
/* .page-holder {
    min-height: 100vh;
}
.bg-cover {
    background-size: cover !important;
}
/* #background-div {
    background: url('../assets/home.png');
} */
/* #heading {
    font-weight: 400;
} */
</style>
