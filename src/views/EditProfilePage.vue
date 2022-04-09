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
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body">
                        <form id="editprofileform">
                            <div class="row gutters">
                                <div
                                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                >
                                    <h6 class="mb-2 text-primary">
                                        Personal Details
                                    </h6>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="firstName"
                                            >First Name</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="firstName"
                                            placeholder="Enter Full Name"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="lastName"
                                            placeholder="Enter Last Name"
                                        />
                                    </div>
                                </div>
                                <!-- <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="eMail">Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="eMail"
                                        placeholder="Enter email ID"
                                    />
                                </div>
                            </div> -->
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="phoneNum">Phone</label>
                                        <input
                                            type="tel"
                                            class="form-control"
                                            id="phoneNum"
                                            placeholder="Enter Phone Number"
                                        />
                                    </div>
                                </div>
                                <!-- <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="email"
                                            placeholder="Enter Email Address"
                                        />
                                    </div>
                                </div> -->
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="bankAccNum"
                                            >Bank Account Number</label
                                        >
                                        <input
                                            type="name"
                                            class="form-control"
                                            id="bankAccNum"
                                            placeholder="Enter Bank Account Number"
                                        />
                                    </div>
                                </div>
                                <!-- <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="website">Website URL</label>
                                    <input
                                        type="url"
                                        class="form-control"
                                        id="website"
                                        placeholder="Website url"
                                    />
                                </div>
                            </div> -->
                            </div>
                            <div class="row gutters">
                                <div
                                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                >
                                    <h6 class="mt-3 mb-2 text-primary">
                                        Address
                                    </h6>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="streetName"
                                            >Street Name</label
                                        >
                                        <input
                                            type="name"
                                            class="form-control"
                                            id="streetName"
                                            placeholder="Enter Street Name"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="streetNum"
                                            >Street Number</label
                                        >
                                        <input
                                            type="name"
                                            class="form-control"
                                            id="streetNum"
                                            placeholder="Enter Street Number"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="unitNumber"
                                            >Unit Number</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="unitNumber"
                                            placeholder="Enter Unit Number"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                                >
                                    <div class="form-group">
                                        <label for="postalCode"
                                            >Postal Code</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="postalCode"
                                            placeholder="Enter Postal Code"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="row gutters">
                                <div
                                    class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                >
                                    <div class="text-right">
                                        <!-- <router-link to="/profile" tag="button"
                                        >Cancel</router-link
                                    > -->
                                        <button
                                            type="button"
                                            id="submit"
                                            name="submit"
                                            class="btn btn-primary"
                                            v-on:click="goBack()"
                                        >
                                            Back
                                        </button>
                                        &nbsp;
                                        <button
                                            type="button"
                                            id="submit"
                                            name="submit"
                                            class="btn btn-primary"
                                            v-on:click="saveInformation()"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from '../store.js';
import { doc, getFirestore, setDoc, getDoc } from '@firebase/firestore';
// import { set } from 'vue/types/umd';

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export default {
    name: 'EditProfilePage',
    data() {
        return {
            user: null,
            userData: null,
        };
    },
    methods: {
        goBack() {
            // Returns back to the previous page
            this.$router.go(-1);
            // Force the page to reload
            // window.onpopstate = function() {
            //     location.reload();
            // };
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
        async saveInformation() {
            var firstName = document.getElementById('firstName').value;
            var lastName = document.getElementById('lastName').value;
            var phoneNum = document.getElementById('phoneNum').value;
            // var newEmail = document.getElementById('email').value;
            var bankAccNum = document.getElementById('bankAccNum').value;

            // // Address
            var streetName = document.getElementById('streetName').value;
            var streetNum = document.getElementById('streetNum').value;
            var unitNumber = document.getElementById('unitNumber').value;
            var postalCode = document.getElementById('postalCode').value;

            var currentUser = auth.currentUser;

            console.log('currentUser :', currentUser);

            var userRef = doc(db, 'Users', currentUser.displayName);

            var addressRef = doc(
                db,
                'Users',
                currentUser.displayName,
                'Address',
                'Location'
            );

            try {
                const docRef = await setDoc(userRef, {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNum: phoneNum,
                    // email: newEmail,
                    bankAccNum: bankAccNum,
                });
                await setDoc(addressRef, {
                    streetName: streetName,
                    streetNum: streetNum,
                    unitNumber: unitNumber,
                    postalCode: postalCode,
                });
                console.log(docRef);
                document.getElementById('editprofileform').reset();
                alert('Personal Information Updated!');
                this.goBack();
            } catch (error) {
                console.error('Error updating profile: ', error);
            }
        },
    },
    mounted() {
        onAuthStateChanged(auth, user => {
            store.dispatch('fetchUser', user);
            if (user != null) {
                this.user = user;
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
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
}
</style>
