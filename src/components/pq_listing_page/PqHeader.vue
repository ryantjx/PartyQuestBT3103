<template>
    <div class="header">
        <div class="float-left-child">
            <div class="combine">
                <div v-if="images.length > 0">
                    <div v-for="image in images" :key="image.src">
                        <img :src="image.src" />
                    </div>
                </div>
                <div class="title" id="title">
                    <h1></h1>
                </div>
            </div>
        </div>
        <div class="float-left-child2">
            <template v-if="PQstatus == 'Not Started'">
                <h3 class="completion1" id="status"></h3>
            </template>
            <template v-else-if="PQstatus == 'In Progress'">
                <h3 class="completion2" id="status"></h3>
            </template>
            <template v-else>
                <h3 class="completion3" id="status"></h3>
            </template>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';

var uuid;
var picUrl;
var listOfImages = [];
export default {
    name: 'PqHeader',

    data() {
        uuid = this.$route.params.id;
        return {
            images: listOfImages,
            id: this.$route.params.id,
            PQstatus: null,
        };
    },

    methods: {
        async getData() {
            const db = getFirestore(firebaseApp);
            // create query
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('partyQuestid', '==', uuid)
            );
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();
                this.PQstatus = pqDoc.status;
                console.log(this.PQstatus);
            });
        },

        async display() {
            const db = getFirestore(firebaseApp);
            // create query
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('partyQuestid', '==', uuid)
            );
            await this.getData();
            console.log('PQstatus is ', this.PQstatus);
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();
                picUrl = pqDoc.photoId;
                const storage = getStorage();
                // const storageRef = storage.ref();
                // const imageRef = storageRef.child(picUrl);
                const pathReference = ref(storage, picUrl);

                // await imageRef.put(file, metaData);

                // const downloadUrl = await imageRef.getDownloadURL();
                getDownloadURL(pathReference)
                    .then(url => {
                        listOfImages.push({ src: url });
                    })
                    .catch(error => {
                        console.log(error);
                    });
                let title = document.getElementById('title');
                console.log(title.innerHTML);
                console.log('Changing');
                document.getElementById('title').innerHTML = pqDoc.title;
                console.log(title.innerHTML);

                let status = document.getElementById('status');
                console.log(status.innerHTML);
                console.log('Changing');
                document.getElementById('status').innerHTML = pqDoc.status;
                console.log(status.innerHTML);
                /*
                const storage = getStorage();
                let string = pqDoc.photoId;
                const storageRef = ref(storage, string);

                getDownloadURL(storageRef)
                    // eslint-disable-next-line prettier/prettier
                        .then((url) => {
                        console.log('trying url');
                        console.log(url);

                        //used to display pic -> need to add in a image element at the area u want to display on the html
                        const img = document.getElementById('profilePic');
                        img.setAttribute('src', url);
                    })
                    // eslint-disable-next-line prettier/prettier
                        .catch((error) => { // eslint-disable-line no-unused-vars
                        //Handle any errors
                    });*/
            });
        }, // displayPic();
    },
    mounted() {
        // async function displayPic() {
        //     // var metaData = {
        //     //     contentType: 'image/jpeg',
        //     // };
        //     const storage = getStorage();
        //     // const storageRef = storage.ref();
        //     // const imageRef = storageRef.child(picUrl);
        //     const pathReference = ref(storage, picUrl);

        //     // await imageRef.put(file, metaData);

        //     // const downloadUrl = await imageRef.getDownloadURL();
        //     getDownloadURL(pathReference)
        //         .then(url => {
        //             this.images.push({ src: url });
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // }
        this.display();
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');

img {
    max-width: 250px;
    margin: 15px;
}

.header {
    display: flex;
    padding-inline-start: 100px;
    padding-inline-end: 100px;
    font-family: 'PT Serif', serif;
}

.title {
    padding-inline-start: 60px;
    padding-block-start: 60px;
}

.combine {
    display: flex;
}

.float-left-child {
    flex: 1;
    text-align: end;
}

.float-left-child2 {
    flex: 1;
    text-align: end;
    padding-block-start: 60px;
}

.completion1 {
    background-color: rgb(252, 134, 50);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px 8px;
}
.completion2 {
    background-color: rgb(4, 128, 0);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px 8px;
}
.completion3 {
    background-color: rgb(112, 110, 112);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px 8px;
}
</style>
