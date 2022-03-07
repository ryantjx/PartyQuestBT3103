
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
//import firebaseApp from '../firebase.js';
import {firebase} from "firebase/firestore"

export default {
        data() {
            return {
                email: '',
                password:'',
            };
        },
        methods: {
            register() {
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
            },
        },
    }
</script>

<style>
input {
  margin-right: 20px;
}
</style>