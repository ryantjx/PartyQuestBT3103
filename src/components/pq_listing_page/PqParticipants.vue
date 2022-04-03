<template>
    <div class="detailpage">
        <h1 id="Participants"></h1>
        <table id="table-participants" class="auto-index" v-onload="test()">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </table>

        <br /><br />
        <div class="container" id="buttons">
            <!-- need to change check to check if user is a participant-->
            <template v-if="userName == grpId">
                <!--For Owner View-->
                <div class="buttons">
                    <button class="confirm">Complete/Confirm</button>
                    <button v-on:click="handleClick()" class="leave">
                        Leave PQ
                    </button>
                </div>
            </template>
            <template v-else>
                <!--For Participant View-->
                <div class="buttons">
                    <button v-on:click="handleJoin()" class="join">Join</button>
                    <button v-on:click="handleSave()" class="save">
                        Save PQ
                    </button>
                </div>
            </template>
        </div>
        <div>
            <ClientOnly>
                <Modal v-model="showSecondModal" title="Report User">
                    <form novalidate>
                        <div class="form-group">
                            <label for="formField1">Reason for report: </label>
                            <input
                                id="formField1"
                                type="textarea"
                                class="form-control"
                                placeholder=""
                                rows="4"
                            />
                        </div>
                        <div class="row modal-footer">
                            <div class="col-sm-12">
                                <div class="float-right">
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        @click="submit()"
                                    >
                                        Submit
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
                    </form>
                </Modal>
            </ClientOnly>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore, addDoc } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
var uuid;
var groupCreatorid;

export default {
    name: 'Participants',

    data() {
        uuid = this.$route.params.id;
        return {
            id: this.$route.params.id,
            grpId: '',
            userName: '',
            showSecondModal: false,
        };
    },
    methods: {
        async submit() {
            var reason = document.getElementById('formField1').value;
            try {
                const db = getFirestore(firebaseApp);
                const docRef = await addDoc(collection(db, 'Report'), {
                    Reporter: this.userName,
                    ReportedUser: 'test',
                    Reason: reason,
                });
                console.log(docRef);
                window.location.reload();
            } catch (err) {
                alert(err);
            }
            this.showSecondModal = false;
        },
        cancel() {
            this.showSecondModal = false;
        },
        reportUser() {
            this.showSecondModal = true;
        },
        async test() {
            const db = getFirestore(firebaseApp);
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('partyQuestid', '==', uuid)
            );
            console.log('filterquery');
            console.log(filterQuery);

            const auth = getAuth(firebaseApp);
            const user = auth.currentUser;
            let querySnapshot = await getDocs(filterQuery);
            querySnapshot.forEach(docs => {
                //get documents
                let pqDoc = docs.data();
                this.grpId = pqDoc.groupCreatorid;
                this.userName = user.displayName;
            });
        },
        // add handleSave handleJoin functions
        //handleSave -> bookmark within Participant database,
        //save PQ title (handle error for already saved -> Alert already saved)
        //handleJoin -> add user id to pq list of participants -> check for max

        handleClick() {
            this.$confirm({
                message: 'Confirm to leave PQ?',
                button: {
                    no: 'Stay',
                    yes: 'Leave',
                },
                /**
                 * Callback Function
                 * @param {Boolean} confirm
                 */
                callback: async confirm => {
                    if (confirm) {
                        const db = getFirestore(firebaseApp);
                        let filterQuery = query(
                            collection(db, 'PartyQuests'),
                            where('partyQuestid', '==', uuid)
                        );
                        let querySnapshot = await getDocs(filterQuery);
                        querySnapshot.forEach(docs => {
                            //get documents
                            let pqDoc = docs.data();
                            for (
                                let x = 0;
                                x < pqDoc.participants.length;
                                x++
                            ) {
                                if (pqDoc.participants[x] == 'ryanng') {
                                    pqDoc.participants.splice(1, 1);
                                    pqDoc.participantStatus.splice(1, 1);
                                } else {
                                    //donothing;
                                }
                            }
                        });
                        window.location.replace('/home');
                    } else {
                        //donothing
                    }
                },
            });
        },
    },
    mounted() {
        const page = this;
        const db = getFirestore(firebaseApp);
        let filterQuery = query(
            collection(db, 'PartyQuests'),
            where('partyQuestid', '==', uuid)
        );
        console.log('filterquery');
        console.log(filterQuery);
        async function participantDisplay() {
            const auth = getAuth(firebaseApp);
            const user = auth.currentUser;
            let querySnapshot = await getDocs(filterQuery);
            let index = 1;
            querySnapshot.forEach(docs => {
                //get documents
                let pqDoc = docs.data();
                //let participants = pqDoc.participants;
                for (let x = 0; x < pqDoc.participants.length; x++) {
                    console.log(x);
                    console.log(pqDoc.participants[x]);
                    console.log(pqDoc.participantStatus[x]);
                    groupCreatorid = pqDoc.groupCreatorid;
                    let ppl = document.getElementById('Participants');
                    let a =
                        'Participants: ' +
                        pqDoc.participants.length +
                        '/' +
                        pqDoc.numOfPeople;
                    document.getElementById('Participants').innerHTML = a;
                    console.log(ppl.innerHTML);

                    var table = document.getElementById('table-participants');
                    var row = table.insertRow(index);

                    var name = pqDoc.participants[x];
                    var status = pqDoc.participantStatus[x];

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = name;
                    cell2.innerHTML = status;

                    //Check for Owner or Participant
                    if (pqDoc.groupCreatorid == user.displayName) {
                        console.log('Owner Table Functions');

                        var viewButton = document.createElement('button');
                        viewButton.className = 'bwt';
                        viewButton.id = String(name);
                        viewButton.innerHTML = 'Test';
                        viewButton.onclick = function() {
                            window.location.replace(
                                '/profile/' + pqDoc.participants[x]
                            );
                        };

                        var reportButton = document.createElement('button');
                        reportButton.className = 'bwt';
                        reportButton.id = String(name);
                        reportButton.innerHTML = 'Test2';
                        reportButton.onclick = function() {
                            page.reportUser();
                        };

                        var kickButton = document.createElement('button');
                        kickButton.className = 'bwt';
                        kickButton.id = String(name);
                        kickButton.innerHTML = 'Kick';
                        kickButton.onclick = function() {
                            //kick function
                        };

                        cell3.appendChild(viewButton);
                        cell3.appendChild(reportButton);
                        cell3.appendChild(kickButton);
                        index++;
                    } else {
                        console.log('Participant Table Functions');
                        var viewButton2 = document.createElement('button');
                        viewButton2.className = 'bwt';
                        viewButton2.id = String(name);
                        viewButton2.innerHTML = 'View';
                        viewButton2.onclick = function() {
                            window.location.replace(
                                '/profile/' + pqDoc.participants[x]
                            );
                        };

                        //add check for whether user is participant already
                        //if (user.displayName in pqDoc.participants){
                        //add report button
                        //}
                        var reportButton2 = document.createElement('button');
                        reportButton2.className = 'bwt';
                        reportButton2.id = String(name);
                        reportButton2.innerHTML = 'Report';
                        reportButton2.onclick = function() {
                            page.reportUser();
                        };
                        cell3.appendChild(viewButton2);
                        cell3.appendChild(reportButton2);
                        index++;
                    }
                }
            });
        }

        async function ownerDisplay() {
            function updateFields(id, participants, participantStatus, x) {
                db.collection('PartyQuests')
                    .doc(id)
                    .update({
                        participants: participants.splice(x, 1),
                        participantStatus: participantStatus.splice(x, 1),
                    })
                    .then(ref => {
                        console.log(ref);
                        window.location.reload();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
            let querySnapshot = await getDocs(filterQuery);
            let index = 1;
            querySnapshot.forEach(docs => {
                console.log('querysnapshot');
                console.log(querySnapshot);
                //get documents
                let pqDoc = docs.data();
                //let participants = pqDoc.participants;
                console.log(pqDoc);
                console.log(pqDoc.participants.length);
                for (let x = 0; x < pqDoc.participants.length; x++) {
                    console.log(x);
                    console.log(pqDoc.participants[x]);
                    console.log(pqDoc.participantStatus[x]);

                    let ppl = document.getElementById('Participants');
                    let a =
                        'Participants: ' +
                        pqDoc.participants.length +
                        '/' +
                        pqDoc.numOfPeople;
                    document.getElementById('Participants').innerHTML = a;
                    console.log(ppl.innerHTML);

                    var table = document.getElementById('table-participants');
                    var row = table.insertRow(index);

                    var name = pqDoc.participants[x];
                    var status = pqDoc.participantStatus[x];

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = name;
                    cell2.innerHTML = status;
                    cell3.className = 'view-manage-buttons';

                    var viewButton = document.createElement('button');
                    var kickButton = document.createElement('button');
                    viewButton.className = 'bwt';
                    viewButton.id = String(name);
                    viewButton.innerHTML = 'View';
                    viewButton.onclick = function() {
                        window.location.replace(
                            '/profile/' + pqDoc.participants[x]
                        );
                    };
                    var reportButton = document.createElement('button');
                    reportButton.className = 'bwt';
                    reportButton.id = String(name);
                    reportButton.innerHTML = 'Report';
                    reportButton.onclick = function() {
                        page.reportUser();
                    };
                    if (pqDoc.participants[x] == pqDoc.groupCreatorid) {
                        cell3.appendChild(viewButton);
                        cell3.appendChild(reportButton);
                        index++;
                    } else {
                        kickButton.className = 'bwt';
                        kickButton.id = String(name);
                        kickButton.innerHTML = 'Kick';
                        kickButton.onclick = function() {
                            updateFields(
                                docs.id,
                                pqDoc.participants,
                                pqDoc.participantStatus,
                                x
                            );
                        };
                        cell3.appendChild(viewButton);
                        cell3.appendChild(kickButton);
                        cell3.appendChild(reportButton);
                        index++;
                    }
                }
            });
        }

        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user.displayName == groupCreatorid) {
                console.log(groupCreatorid);
                console.log(user.displayName);
                console.log('In Owner Display');
                ownerDisplay();
            } else {
                console.log(groupCreatorid);
                console.log(user.displayName);
                console.log('In participant display');
                participantDisplay();
            }
        });
        // async function viewUser(name) {
        //     const db = getFirestore(firebaseApp);
        //     const auth = getAuth();
        //     var user = auth.currentUser.email;
        //     var name = coin;
        //     alert('Confirm to delete: ' + name + '?');
        //     await deleteDoc(doc(db, String(user), name));
        //     console.log('Successfully deleted ' + name);
        //     let tb = document.getElementById('table');
        //     while (tb.rows.length > 1) {
        //         tb.deleteRow(1);
        //     }
        //     document.getElementById('profit').innerHTML = '';
        //     display(user);
        // }
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');

h1,
h2 {
    text-align: center;
    font-family: 'PT Serif', serif;
    /* background-color: rgb(129, 184, 99);
    font: 700;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold; */
}

#table-participants {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    font-family: 'PT Serif', serif;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
}

tr:nth-child(even) {
    background-color: #e3edee;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

.bwt {
    /* color: black; */
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    /* color: rgb(243, 236, 236); */
    /* background-color: rgb(255, 94, 0); */
}

.view-manage-buttons {
    display: flex;
    justify-content: space-around;
}

.buttons {
    display: flex;
    justify-content: space-between;
    padding-inline-start: 40%;
    padding-inline-end: 40%;
    font-family: 'PT Serif', serif;
}

.confirm {
    background-color: green;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}

.leave {
    background-color: red;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}
.join {
    background-color: lightsalmon;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}

.save {
    background-color: lightblue;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}
</style>
