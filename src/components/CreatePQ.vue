<template>
    <div>
        <form @submit.prevent="create">
            <h2>Create a PQ</h2>
            <input
                id="title"
                type="text"
                required=""
                placeholder="Title of PQ"
            />
            <br />
            <br />
            <input id="brand" type="text" required="" placeholder="Brand" />
            <br />
            <br />
            <input
                id="link"
                type="href"
                required=""
                placeholder="Link to Website"
            />
            <br />
            <br />
            <input
                id="total"
                type="number"
                required=""
                placeholder="Total Amount"
            />
            <br />
            <br />
            <input
                id="location"
                type="text"
                required=""
                placeholder="Collection Location"
            />
            <br />
            <br />
            <input
                id="participants"
                type="number"
                required=""
                placeholder="Total Number of Participants"
            />
            <br />
            <br />
            <input
                id="enddate"
                type="date"
                required=""
                placeholder="Projected End Date"
            />
            <br />
            <br />
            <input
                id="description"
                type="text"
                required=""
                placeholder="Description"
            />
            <br />
            <br />
            <input
                id="requirements"
                type="text"
                required=""
                placeholder="Requirements"
            />
            <br />
            <br />
            <label for="picture"> Upload Picture Here: </label>
            <input
                id="picture"
                type="file"
                placeholder="Upload Picture Here: "
                accept="image/*"
                @change="onFileSelected"
            />
            <br />
            <br />
            <button id="createbutton" type="button" v-on:click="create()">
                Create
            </button>
        </form>
        <!--image element to be added where you want picture to be displayed -->
        <img id="profilePic" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebaseApp from '../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from 'firebase/storage';
//import { getAuth } from 'firebase/auth'; //need to use when getting logged in data

const db = getFirestore(firebaseApp);

export default {
    name: 'CreatePQ',
    data() {
        return {
            title: '',
            brand: '',
            link: '',
            total: '',
            location: '',
            participants: '',
            enddate: '',
            description: '',
            requirements: '',
            picture: '',
            username: '', //need to pull username from state management
            selectedFile: null,
            fileType: null,
            booleanCheck: null,
            fileName: null,
            file: null,
        };
    },
    computed: {
        ...mapGetters({
            // map `this.user` to `this.$store.getters.user`
            user: 'user',
        }),
    },
    methods: {
        //function to handle new image added to be uploaded
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileType = event.target.files[0].type;
            if (this.fileType.includes('image')) {
                //form validation to make sure image submitted
                this.booleanCheck = true;
            } else {
                this.booleanCheck = false;
            }
            this.fileName = this.selectedFile.name;
            //below is used to read and write the file into base64 string to upload into firebase storage
            const fileReader = new FileReader();
            fileReader.addEventListener('load', () => {
                this.file = fileReader.result; //base64 string
            });
            fileReader.readAsDataURL(this.selectedFile);
            console.log('Uploading Data');
        },
        //used to handle form submission
        async create() {
            console.log('Attempting to Create PQ');

            //used for info retrieval from logged in user data
            //const auth = getAuth(firebaseApp);
            //const user = auth.currentUser;
            //console.log('Checking User');
            //console.log(user.uid);
            //console.log(typeof user);

            var title = document.getElementById('title').value;
            var brand = document.getElementById('brand').value;
            var link = document.getElementById('link').value;
            var total = document.getElementById('total').value;
            var location = document.getElementById('location').value;
            var participants = document.getElementById('participants').value;
            var enddate = document.getElementById('enddate').value;
            var description = document.getElementById('description').value;
            var requirements = document.getElementById('requirements').value;
            //this.username = user.displayName;
            //print(user);
            var picture = document.getElementById('picture').value;

            if (
                title &&
                brand &&
                link &&
                total &&
                location &&
                participants &&
                enddate &&
                description &&
                requirements &&
                picture &&
                this.booleanCheck
            ) {
                const docRef = await setDoc(doc(db, 'PQs', title), {
                    Title: title,
                    Brand: brand,
                    Link: link,
                    Total: total,
                    Location: location,
                    Participants: participants,
                    Enddate: enddate,
                    Description: description,
                    Requirements: requirements,
                });
                console.log(docRef);
                this.$emit('Created');
                alert('Saving new PQ : ' + title);

                const storage = getStorage();
                //to get file type of image
                let fileType2 = this.fileType.split('/')[1];
                console.log(fileType2);
                let string = '/PQ/' + title + '.' + fileType2;
                console.log(string);
                const storageRef = ref(storage, string);
                const msg2 = this.file.split(',')[1];
                uploadString(storageRef, msg2, 'base64');
                console.log('uploaded');

                //code used to dislay image from firebase storage (change storageref line to path that image is stored within firebase storage)
                console.log('attempting download');
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
                        // Handle any errors
                    });

                //need to push this to a PQ details page or refresh form fields
                this.$router.push('/register').catch(() => {});
            } else {
                console.error('Error adding PQ: ');
                alert('Please fill in Valid Details');
            }
        },
    },
};
</script>
