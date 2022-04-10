<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div
                v-for="(value, index) in pqList"
                :key="index"
                class="col-md-6 col-xl-3 col-8 pt-5 shadow p-3 mb-5 ml-3 mr-3 bg-white rounded"
            >
                <div
                    class="pq-card-view"
                    v-on:click="directToPQ(value.id)"
                    style="cursor:pointer"
                >
                    <div class="img-card-view">
                        <!-- <div v-if:"{value.image}">
                            <h1> There is not image in the values
                            </div> -->
                        <img
                            class="card-img-top embed-responsive-item"
                            :src="value.imageUrl"
                        />
                        <!-- <p>{{ value.image }}</p> -->
                        <!-- <img v-bind:href="value.image" /> -->
                        <!-- <img
                            class="card-img-top embed-responsive-item"
                            src="require(${value.image})"
                            alt="Card image
                        cap"
                        /> -->
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ value.title }}</h5>
                        <div class="card-text text-muted small">
                            <p>Brand: {{ value.brand }}</p>
                            <p>Description: {{ value.description }}</p>
                        </div>
                        <br />
                        <!-- <router-link
                :to="{ name: 'EditProduct', params: { id: product.id } }"
            >
                <button class="btn btn-primary">Edit</button>
            </router-link> -->
                        <button
                            class="join-btn"
                            type="button"
                            v-on:click="directToPQ(value.id)"
                        >
                            Click to Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
const storage = getStorage(firebaseApp);

export default {
    name: 'ProductBox',
    props: {
        partyQuestData: {
            type: Array,
        },
    },
    data() {
        return {
            pqList: null,
        };
    },
    methods: {
        directToPQ(id) {
            console.log('this is the docs id for search results user', id);
            window.location.replace('/pq/' + id);
        },
        async display() {
            this.pqList = [];
            //obtain photo and pass it as a variable
            console.log(
                'type of partyquestdata in pqbox ',
                this.partyQuestData
            );
            var pqDataLength = this.partyQuestData.length;
            for (var i = 0; i < pqDataLength; i++) {
                var someMap = this.partyQuestData[i];
                var photoReference = ref(storage, someMap['photoId']);
                await getDownloadURL(photoReference).then(value => {
                    someMap['imageUrl'] = value;
                    console.log(value);
                    this.pqList.push(someMap);
                });
                // console.log(
                //     'type of map in pqbox ',
                //     typeof JSON.parse(JSON.stringify(someMap))
                // );
            }
            console.log('values of pq in pqbox ', this.pqList);
        },
    },
    mounted() {
        console.log('Data passed into the component', this.partyQuestData);
        if (this.partyQuestData) {
            this.display();
        }
    },
};
</script>
<style scoped>
.card-img-top {
    object-fit: cover;
}

.img-card-view {
    border-color: black;
    border-width: 4px;
}

.join-btn {
    position: absolute;
    right: 1vw;
    bottom: 2vh;
    background: none;
    border-radius: 16px 16px;
    background-color: #6495ed;
    color: white;
    margin-inline-start: 4px;
    padding: 8px;
    border-width: 0px;
}

.container {
    width: 100%;
}
</style>
