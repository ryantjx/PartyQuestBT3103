<template>
    <div class="create-pq-container">
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div class="card h-100">
                <div class="card-body">
                    <form id="editprofileform">
                        <div class="row gutters">
                            <div
                                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                            >
                                <h2 class="mb-2 text-primary">
                                    Create a PartyQuest
                                </h2>
                            </div>

                            <br /><br />

                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="title"
                                        placeholder="Enter Title of PQ"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="brand">Brand</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="brand"
                                        placeholder="Enter Brand"
                                    />
                                </div>
                            </div>

                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="participants"
                                        >Total Number of Participants</label
                                    >
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="participants"
                                        placeholder="Enter Number of Participants"
                                    />
                                </div>
                            </div>

                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="total">Total Amount</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="total"
                                        placeholder="Enter Total Amount"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="link">Website</label>
                                    <input
                                        type="href"
                                        class="form-control"
                                        id="link"
                                        placeholder="Enter Link to Website"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="enddate">End Date</label>
                                    <input
                                        type="date"
                                        class="form-control"
                                        id="enddate"
                                        placeholder="Enter Enddate"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="location"
                                        >Collection Location</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="location"
                                        placeholder="Enter Collection Location"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="description"
                                        placeholder="Enter Description of PQ"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group">
                                    <label for="requirements"
                                        >Requirements</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="requirements"
                                        placeholder="Enter any Requirements for PQ"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12"
                            >
                                <div class="form-group-pic">
                                    <label for="picture">
                                        Upload Picture Here:
                                    </label>
                                    <div class="inner-form-group-pic">
                                        <input
                                            id="picture"
                                            type="file"
                                            placeholder="Upload Picture Here: "
                                            accept="image/*"
                                            @change="onFileSelected"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div
                                class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                            >
                                <div class="text-right">
                                    <!-- <router-link to="/profile" tag="button"
                                    >Cancel</router-link
                                > -->
                                    <button
                                        type="button"
                                        id="submit"
                                        name="submit"
                                        class="btn btn-primary"
                                        v-on:click="goHome()"
                                    >
                                        Back
                                    </button>
                                    &nbsp;
                                    <button
                                        type="button"
                                        id="createbutton"
                                        name="create"
                                        class="btn btn-primary"
                                        v-on:click="handleSubmit()"
                                    >
                                        Create PQ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-------------------- IMAGE Display Div--------------------------->
    <!--image element to be added where you want picture to be displayed
        <img id="profilePic" />-->
</template>

<script>
import { mapGetters } from 'vuex';
import firebaseApp from '../firebase.js';
import { addDoc, getFirestore, updateDoc, doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { getStorage, ref, uploadString } from 'firebase/storage';
//import getDownloadURL from 'firebase/storage';
import { getAuth } from 'firebase/auth'; //need to use when getting logged in data

const db = getFirestore(firebaseApp);

export default {
    name: 'CreatePartyQuest',
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
        goHome() {
            window.location.replace('/home');
        },
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

        async handleSubmit() {
            await this.create();
        },

        //used to handle form submission
        async create() {
            console.log('Attempting to Create PQ');

            //used for info retrieval from logged in user data
            const auth = getAuth(firebaseApp);
            const user = auth.currentUser;
            console.log('Checking User');
            console.log(user.uid);
            console.log(typeof user);

            var title = document.getElementById('title').value;
            var brand = document.getElementById('brand').value;
            var link = document.getElementById('link').value;
            var total = document.getElementById('total').value;
            var location = document.getElementById('location').value;
            var participants = document.getElementById('participants').value;
            var enddate = document.getElementById('enddate').value;
            var description = document.getElementById('description').value;
            var requirements = document.getElementById('requirements').value;
            this.username = user.displayName;
            console.log(this.username);
            var picture = document.getElementById('picture').value;
            var lowerBrand = brand.toLowerCase();
            var lowerUser = this.username.toLowerCase();

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
                const docRef = await addDoc(collection(db, 'PartyQuests'), {
                    title: title,
                    groupCreatorid: this.username,
                    brand: brand,
                    itemLink: link,
                    totalAmount: total,
                    collectionLocation: location,
                    numOfPeople: participants,
                    endDate: enddate,
                    description: description,
                    requirements: requirements,
                    status: 'Not Started',
                    participants: [this.username],
                    participantStatus: ['Not Confirmed'],
                    lowerBrand: lowerBrand,
                    lowerUser: lowerUser,
                    savedPqs: [],
                });
                console.log('Generating random String');
                this.$emit('Created');
                alert('Saving new PQ : ' + title);

                const storage = getStorage();
                //to get file type of image
                let fileType2 = this.fileType.split('/')[1];
                console.log(fileType2);
                let string = '/PartyQuests/' + docRef.id + '.' + fileType2;
                console.log(string);
                const storageRef = ref(storage, string);
                const msg2 = this.file.split(',')[1];
                uploadString(storageRef, msg2, 'base64');
                console.log('uploaded');
                console.log('Trying Update');
                const ref1 = doc(db, 'PartyQuests', docRef.id);
                const docRef2 = await updateDoc(ref1, {
                    partyQuestid: docRef.id,
                    photoId: string,
                });
                console.log('Updating id and photo');
                console.log(docRef2);
                this.$emit('Updated');

                //-------------------------------------Download/Display Image code for other pages--------------------------------------------
                //code used to dislay image from firebase storage (change storageref line to path that image is stored within firebase storage)
                //take note need to import getDownloadUrl from firebase/storage for this code to work
                //console.log('attempting download');
                //getDownloadURL(storageRef)
                // eslint-disable-next-line prettier/prettier
                //.then((url) => {
                //console.log('trying url');
                //console.log(url);

                //used to display pic -> need to add in a image element at the area u want to display on the html
                //const img = document.getElementById('profilePic');
                //img.setAttribute('src', url);
                //})
                // eslint-disable-next-line prettier/prettier
                //.catch((error) => { // eslint-disable-line no-unused-vars
                // Handle any errors
                //});
                //-----------------------------------------------------------------------------------------------------------------------------

                //need to push this to a PQ details page or refresh form fields
                this.$router.push('/home').catch(() => {});
            } else {
                console.error('Error adding PQ: ');
                alert('Please fill in Valid Details');
            }
        },
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

.inner-form-group-pic {
    font-size: 0.825rem;
}

.create-pq-container {
    justify-content: center;
    display: flex;
}

.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 0.825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
</style>
