<template>
    <div>
        <form @submit.prevent="register">
            <h2>Register</h2>
            <input id="username" type="text" placeholder="Username" />
            <br />
            <br />
            <input
                id="email"
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <br />
            <br />
            <input
                id="pw"
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <br />
            <br />
            <button id="registerbutton" type="button" v-on:click="register()">
                Register
            </button>
        </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default {
    name: 'SignUpForm',
    data() {
        return {
            username: '',
            email: '',
            password: '',
        };
    },
    methods: {
        async register() {
            console.log('Attempting to register');
            const auth = getAuth(firebaseApp);

            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('pw').value;

            var snapUser = await getDoc(doc(db, 'Users', username));

            if (snapUser.exists()) {
                alert('Username Exists. Please use another Username');
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setDoc(doc(db, 'Users', username), {
                        username: username,
                        email: email,
                        password: password,
                    });
                    //Sets the state user displayName
                    // userCredential.user.updateProfile({
                    //     displayName: username,
                    // });
                    updateProfile(auth.currentUser, {
                        displayName: username,
                    });
                    alert('Successfully registered! Please login.');
                    this.$router.push('/dashboard').catch(() => {});
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
