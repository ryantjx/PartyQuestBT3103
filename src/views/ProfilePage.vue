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
                                    {{ this.user.email }}
                                </h6>
                                <router-link to="/editProfile"
                                    >Edit profile</router-link
                                >
                            </div>
                            <div class="about">
                                <h5>Account Details</h5>
                                <div
                                    class="mp-0 text-muted small"
                                    v-if="userData"
                                >
                                    <p>First Name: {{ userData.firstName }}</p>
                                    <p>Last Name: {{ userData.lastName }}</p>
                                    <p>Phone Number: {{ userData.phoneNum }}</p>
                                    <p>
                                        Address : {{ userData.unitNum }}|{{
                                            userData.streetNum
                                        }}|{{ userData.streetName }}
                                    </p>
                                    <p>Postal: {{ user.postalCode }}</p>
                                </div>
                                <div v-else class="mp-0 text-muted small">
                                    No data filled in yet!
                                </div>
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
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    getDoc,
} from 'firebase/firestore';
import PartyQuestList from '../components/PartyQuestList.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../store.js';
// import Vue from 'vue';

const db = getFirestore(firebaseApp);

// Vue.forceUpdate();

export default {
    name: 'ProfilePage',
    data() {
        console.log('creattion of data');
        return {
            isCreated: false,
            items: null,
            user: null,
            userData: null,
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
        async getData(user) {
            console.log(
                'User display name obtained for obtain pq list ',
                user.displayName
            );
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
                where('status', '==', 'Completed'),
                where('participants', 'array-contains', user.displayName)
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
                pqMap['photoId'] = pq['photoId'];
                pqMap['description'] = pq['description'];
                pqMap['requirements'] = pq['requirements'];
                pqMap['groupCreatorid'] = pq['groupCreatorid'];
                pqMap['numOfPeople'] = pq['numOfPeople'];
                pqMap['collectionLocation'] = pq['collectionLocation'];
                pqMap['endDate'] = pq['endDate'];
                pqMap['status'] = pq['status'];
                //Push map into array
                itemsList.push(pqMap);
            });
            return itemsList;
        },
        async getUserData() {
            console.log('user query data');
            var userRef = doc(db, 'Users', this.user.displayName);
            var addressRef = doc(
                db,
                'Users',
                this.user.displayName,
                'Address',
                'Location'
            );

            var userQuery = await getDoc(userRef);
            var addressQuery = await getDoc(addressRef);

            var userInfo = userQuery.data();
            var addressInfo = addressQuery.data();

            // console.log(userInfo);
            // console.log(addressInfo);
            var mapUserInfo = {};

            //User Info
            mapUserInfo['firstName'] = userInfo['firstName'];
            mapUserInfo['lastName'] = userInfo['lastName'];
            mapUserInfo['phoneNum'] = userInfo['phoneNum'];
            //Address Info
            mapUserInfo['unitNum'] = addressInfo['unitNumber'];
            mapUserInfo['streetNum'] = addressInfo['streetNum'];
            mapUserInfo['streetName'] = addressInfo['streetName'];
            mapUserInfo['postalCode'] = addressInfo['postalCode'];

            this.userData = mapUserInfo;
            // console.log(this.userData);
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
                this.passListasData(completedList);
                this.getUserData();
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
</style>
