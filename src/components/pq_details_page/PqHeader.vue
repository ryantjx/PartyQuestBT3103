<template>
    <div>
        <div class="top-row">
            <button
                type="button"
                id="submit"
                name="submit"
                class="btn-go-back"
                v-on:click="goBack()"
            >
                <i class="fa fa-arrow-left"> Back</i>
            </button>
            <div class="float-left-child2">
                <div>
                    <template v-if="this.saveCheck">
                        <!-- check whether PQ is currently saved regardless of whether owner/participant-->
                        <button v-on:click="setUnsave()" class="unsave">
                            <i class="fa fa-bookmark"></i>
                        </button>
                    </template>
                    <template v-else>
                        <button v-on:click="setSave()" class="save">
                            <i class="fa fa-bookmark-o"></i>
                        </button>
                    </template>
                </div>
                <div class="completion-btn">
                    <template v-if="this.PQstatus == 'Not Started'">
                        <h3 class="completion-1" id="status"></h3>
                    </template>
                    <template v-else-if="this.PQstatus == 'In Progress'">
                        <h3 class="completion-2" id="status"></h3>
                    </template>
                    <template v-else-if="this.PQstatus == 'Completed'">
                        <h3 class="completion-3" id="status"></h3>
                    </template>
                </div>
            </div>
        </div>
        <div>
            <ClientOnly>
                <Modal v-model="showThirdModal" title="Are you sure?">
                    <template v-if="!this.saveCheck">
                        <div class="form-group">
                            <label for="formField1">Save PartyQuest? </label>
                        </div>
                        <div class="row modal-footer">
                            <div class="col-sm-12">
                                <div class="float-right">
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        @click="handleSave()"
                                    >
                                        Save
                                    </button>
                                    <button
                                        class="btn btn-secondary ml-2"
                                        type="button"
                                        @click="cancel()"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="this.saveCheck">
                        <div class="form-group">
                            <label for="formField1"
                                >Confirm unsave PartyQuest?
                            </label>
                        </div>
                        <div class="row modal-footer">
                            <div class="col-sm-12">
                                <div class="float-right">
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        @click="handleUnsave()"
                                    >
                                        Unsave
                                    </button>
                                    <button
                                        class="btn btn-secondary ml-2"
                                        type="button"
                                        @click="cancel()"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </Modal>
            </ClientOnly>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

var uuid;
var listOfImages = [];
const db = getFirestore(firebaseApp);
export default {
    name: 'PqHeader2',
    data() {
        uuid = this.$route.params.id;
        return {
            images: listOfImages,
            id: this.$route.params.id,
            saveCheck: false,
            PQstatus: null,
            thirdCheck: '',
            showThirdModal: false,
        };
    },
    methods: {
        setSave() {
            console.log('Set Save');
            this.showThirdModal = true;
        },
        setUnsave() {
            console.log('Set Unsave');
            this.showThirdModal = true;
        },
        clearTable() {
            console.warn('tryna clear the table');
            var table = document.getElementById('table-participants');
            var rowCount = table.rows.length;
            while (--rowCount) {
                table.deleteRow(rowCount);
            }
        },
        pushPage(id) {
            window.location.replace('/pq/' + id);
        },
        async handleSave() {
            //save pq uuid to a new field within user
            //we allow for them to save their own PQ, jic they want to keep track of it
            //if already saved then handle error
            if (!this.saveCheck) {
                var userRef = collection(db, 'Users');
                var userPQ = query(
                    userRef,
                    where('username', '==', this.userName)
                );
                var userQuery = await getDocs(userPQ);
                var listOfSavedPq;
                userQuery.forEach(doc => {
                    var user = doc.data();
                    listOfSavedPq = user.savedPartyQuests;
                });
                listOfSavedPq.push(uuid);
                try {
                    const ref = doc(db, 'Users', this.userName);
                    const docRef = await updateDoc(ref, {
                        savedPartyQuests: listOfSavedPq,
                    });
                    console.log(docRef);
                    this.saveCheck = true;
                    this.pushPage(uuid);
                } catch (error) {
                    console.error(error);
                }
            } else {
                //PQ cannot be saved
                alert('PQ is already saved');
            }
        },
        async handleUnsave() {
            if (this.saveCheck) {
                var userRef = collection(db, 'Users');
                var userPQ = query(
                    userRef,
                    where('username', '==', this.userName)
                );
                var userQuery = await getDocs(userPQ);
                var listOfSavedPq;
                var removeIndex;
                userQuery.forEach(doc => {
                    var user = doc.data();
                    listOfSavedPq = user.savedPartyQuests;
                });
                for (let i = 0; i < listOfSavedPq.length; i++) {
                    if (listOfSavedPq[i] == uuid) {
                        removeIndex = i;
                        break;
                    }
                }
                listOfSavedPq.splice(removeIndex, 1);
                try {
                    const ref = doc(db, 'Users', this.userName);
                    const docRef = await updateDoc(ref, {
                        savedPartyQuests: listOfSavedPq,
                    });
                    console.log(docRef);
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                //PQ cannot be saved
                alert('PQ is not saved');
            }
        },
        cancel() {
            this.showThirdModal = false;
        },
        goBack() {
            // Returns back to the previous page
            this.$router.push('/searchresults');
            // Force the page to reload
            // window.onpopstate = function() {
            //     location.reload();
            // };
        },
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
        async updateData() {
            var userRef = collection(db, 'Users');
            var userPQ = query(userRef, where('username', '==', this.userName));
            var userQuery = await getDocs(userPQ);
            var listOfSavedPq;
            var savedBoolean;
            userQuery.forEach(doc => {
                var user = doc.data();
                listOfSavedPq = user.savedPartyQuests;
            });
            for (let i = 0; i < listOfSavedPq.length; i++) {
                if (listOfSavedPq[i] == uuid) {
                    savedBoolean = true;
                    break;
                }
            }
            this.saveCheck = savedBoolean;
        },
    },
    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user != null) {
                console.log(
                    'user name is passed and obtained:',
                    user.displayName
                );
                this.userName = user.displayName;
                this.updateData();
                this.getData();
            }
        });
    },
};
</script>

<style scoped>
.save {
    background-color: none;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    margin: 10px;
}

.unsave {
    border: none;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    margin: 10px;
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.float-left-child2 {
    display: flex;
    align-items: center;
}

.btn-go-back {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border: none;
    top: 15vh;
    background-color: white;
    padding: 8px 8px;
    backdrop-filter: blur(4px);
}

.completion-btn {
    align-items: center;
}

.completion-1 {
    background-color: lightgrey;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    margin-block-start: 8px;
    font-size: 16px;
    border-radius: 8px 8px;
}
.completion-2 {
    background-color: orange;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    margin-block-start: 8px;
    font-size: 16px;
    border-radius: 8px 8px;
}
.completion-3 {
    background-color: green;
    border: none;
    color: black;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    margin-block-start: 8px;
    font-size: 16px;
    border-radius: 8px 8px;
}
</style>
