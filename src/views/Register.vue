<template>
    <SignUpForm />
    <!-- <div>
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
    </div> -->
</template>

<script>
import SignUpForm from '../components/SignUpForm.vue';

export default {
    name: 'Registration',
    components: {
        SignUpForm,
    },
};
</script>
