<template>
    <div>
        <form @submit.prevent="login">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit" v-on:click="login()">Login</button>
            <button class="forgot" v-on:click="goToReset()">
                Forgot your password?
            </button>
        </form>
    </div>
</template>

<script>
// Import only getAuth and signInWithEmailAndPassword as they are the only ones used
import firebaseApp from '../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            const auth = getAuth(firebaseApp);
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    //First Alert
                    // alert('You have logged in successfully');
                    this.$router.push('/dashboard').catch(() => {});
                })
                .catch(error => {
                    alert(error.message);
                });
        },
        goToReset() {
            this.$router.push('/resetpassword').catch(() => {});
        },
    },
};
</script>
