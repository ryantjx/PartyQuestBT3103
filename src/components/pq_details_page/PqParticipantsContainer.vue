<template>
    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
            <PqParticipants />
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import PqParticipants from './PqParticipants.vue';

var uuid;
var picUrl;
var listOfImages = [];

export default {
    name: 'PqHeader',
    components: {
        PqParticipants,
    },
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
                let status = document.getElementById('status');
                console.log(status.innerHTML);
                console.log('Changing');
                document.getElementById('status').innerHTML = pqDoc.status;
                console.log(status.innerHTML);
            });
        },
    },
    mounted() {
        this.display();
    },
};
</script>
<style>
body {
    margin: 0;
    padding-top: 40px;
    color: #2e323c;
    background: #f5f6fa;
    position: relative;
    height: 100%;
}

.title-head {
    color: #007ae1;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
}
</style>
