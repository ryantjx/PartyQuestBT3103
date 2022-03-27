<template>
    <div class="container">
        <div class="item" v-for="(user, index) in users" :key="index">
            <div>
                {{ user.email }}
            </div>
            <div>
                {{ user.username }}
            </div>
        </div>
        <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import {
    getFirestore,
    getDocs,
    collection,
    startAfter,
    query,
} from 'firebase/firestore';
import InfiniteLoading from 'vue-infinite-loading';

const db = getFirestore(firebaseApp);

export default {
    data() {
        return {
            users: [],
            lastUser: null,
        };
    },
    mounted() {
        this.created();
    },
    components: {
        InfiniteLoading,
    },
    methods: {
        async created() {
            let usersCollection = collection(db, 'Users');

            if (this.lastUser) {
                console.log(this.users);
                console.log(this.lastUser);
                //usersCollection.startAt(this.lastUser);
                usersCollection = query(
                    usersCollection,
                    startAfter(this.lastUser)
                );
            }
            const usersSnap = await getDocs(usersCollection);
            this.lastUser = usersSnap.docs[usersSnap.docs.length - 1];
            usersSnap.forEach(doc => {
                this.users.push(doc.data());
            });
            return this.users.length;
        },
        async infiniteHandler($state) {
            const usersCount = await this.created();
            if (usersCount == 0) {
                console.log('loaded');
                return $state.loaded();
            }
            console.log('complete');
            return $state.complete();
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
}

.item {
    height: 1000px;
    flex-basis: 100%;
}
</style>
