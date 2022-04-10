<template>
    <div>
        <br /><br /><br />
        <h1>
            Hello {{ this.user.displayName }}, there is nothing to see here.
        </h1>
        <div class="logo-not-found">
            <img src="@/assets/PartyQuest_Logo.png" alt="logo" />
        </div>
    </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'NotFound',
    data() {
        return {
            user: null,
        };
    },
    methods: {
        navigateHome() {
            window.location.reload('/home');
        },
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            this.user = user;
        });
    },
};
</script>

<style scoped>
.logo-not-found {
    display: flex;
    justify-content: center;
}
</style>
