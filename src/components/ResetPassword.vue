<template>
    <div>
        <form @submit.prevent="resetPW">
            <h2>Reset Password</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
        </form>
        <button type="submit" v-on:click="resetPW()">Reset</button>
    </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default {
    name: 'ResetPW',
    data() {
        return {
            email: '',
        };
    },
    methods: {
        async resetPW() {
            const auth = getAuth();
            if (this.email === '') {
                alert('Empty field');
                return;
            }
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    alert('email sent');
                    console.log('email sent');
                })
                .catch(() => {
                    alert('error sending email');
                    console.log('error sending email');
                });
            this.email = '';
        },
    },
};
</script>
