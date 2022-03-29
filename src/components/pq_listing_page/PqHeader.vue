<template>
    <div class="header">
        <div class="float-left-child">
            <div class="combine">
                <!--<img id="profilePic" />-->
                <img src="../../assets/logo.png" alt="" />
                <div class="title" id="title">
                    <h1></h1>
                </div>
            </div>
        </div>
        <div class="float-left-child2">
            <h3 class="completion" id="status"></h3>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
//import { getStorage, ref } from 'firebase/storage';
//import getDownloadURL from 'firebase/storage';

export default {
    name: 'PqHeader',

    mounted() {
        async function display() {
            const db = getFirestore(firebaseApp);
            // create query
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('partyQuestid', '==', '8wk4OhSGyzzbovEv4DlU')
            );
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();

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
        }
        display();
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');

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

.completion {
    background-color: purple;
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
