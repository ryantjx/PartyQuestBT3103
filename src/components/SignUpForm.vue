<template>
    <div>
        <form @submit.prevent="register">
            <h2>Register</h2>
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
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'SignUpForm',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            const auth = getAuth(firebaseApp);
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
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
