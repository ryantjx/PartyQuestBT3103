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
                                <h5 class="user-name">
                                    {{ this.id }}
                                </h5>
                                <h6 class="user-email">
                                    {{ this.email }}
                                </h6>
                            </div>
                            <div class="about">
                                <h5>About</h5>
                                <p>
                                    This is the other PQ page.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="padding-top-2x mt-2 hidden-lg-up"></div>
                <div class="my-listings margin-bottom-none">
                    <h1>PartyQuest History</h1>
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
                    <!-- need to test if there are no partyquest data for the user what will happen -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PartyQuestList from '../../components/PartyQuestList.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../../store.js';

const db = getFirestore(firebaseApp);
var userId;
export default {
    name: 'OtherProfile',
    data() {
        userId = this.$route.params.id;
        return {
            id: this.$route.params.id,
            email: null,
            isCreated: false,
            items: null,
        };
    },
    components: {
        PartyQuestList,
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
        async getData() {
            console.log(
                'User display name obtained for obtain pq list ',
                userId
            );
            var userRef = collection(db, 'Users');
            var userPQ = query(userRef, where('username', '==', userId));
            var userQuery = await getDocs(userPQ);
            userQuery.forEach(doc => {
                var user = doc.data();
                this.email = user.email;
            });
            var pqRef = collection(db, 'PartyQuests');
            // To be changed, only query for PartyQuests that are already completed
            // Query for user completed party quest
            // Query for partyquest where a user joined and completed
            // var qUserGroupCreator = query(
            //     pqRef,
            //     where('status', '==', 'Completed'),
            //     where('groupCreatorid', '==', user.displayName)
            // );

            var qUserJoinedPQ = query(
                pqRef,
                where('groupCreatorid', '==', userId)
            );

            // var querySnapshotPQ = await getDocs(qUserGroupCreator);
            // var queryGroupCreatorSnapshot = await getDocs(qUserGroupCreator);
            var queryUserJoinedSnapshot = await getDocs(qUserJoinedPQ);
            var itemsList = [];

            // queryGroupCreatorSnapshot.forEach(docs => {
            //     var pq = docs.data();
            //     var pqMap = {};

            //     pqMap['brand'] = pq['brand'];
            //     pqMap['totalAmount'] = pq['totalAmount'];
            //     pqMap['itemLink'] = pq['itemLink'];
            //     pqMap['status'] = pq['status'];
            //     pqMap['title'] = pq['title'];
            //     pqMap['participants'] = pq['participants'];
            //     //Push map into array
            //     itemsList.push(pqMap);
            // });

            queryUserJoinedSnapshot.forEach(docs => {
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
                console.log('user name is passed and obtained:', userId);
                var completedList = [];
                completedList = this.getData();
                this.passListasData(completedList);
            }
        });
    },
};
</script>
