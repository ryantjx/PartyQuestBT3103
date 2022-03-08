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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
        register() {
            const auth = getAuth(firebaseApp);

            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('pw').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setDoc(doc(db, 'Users', username), {
                        username: username,
                        email: email,
                        password: password,
                    });
                    alert('Successfully registered! Please login.');
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
