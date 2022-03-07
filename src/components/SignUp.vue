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

export default {
        data() {
            return {
                email: '',
                password:'',
            };
        },
        methods: {
            register() {
                firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                })
                .catch(error => {
                    alert(error.message);
                });
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
