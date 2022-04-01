<template>
    <div>
        <h1 id="Participants"></h1>
        <table id="table" class="auto-index">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </table>

        <br /><br />
        <div class="buttons">
            <button class="confirm">Confirm</button>
            <button v-on:click="handleClick()" class="leave">Leave PQ</button>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
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
        };
    },
    methods: {
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
        const db = getFirestore(firebaseApp);
        let filterQuery = query(
            collection(db, 'PartyQuests'),
            where('partyQuestid', '==', uuid)
        );
        console.log('filterquery');
        console.log(filterQuery);
        async function participantDisplay() {
            let querySnapshot = await getDocs(filterQuery);
            let index = 1;
            querySnapshot.forEach(docs => {
                //get documents
                let pqDoc = docs.data();
                //let participants = pqDoc.participants;
                console.log(pqDoc);
                console.log(pqDoc.participants.length);
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

                    var table = document.getElementById('table');
                    var row = table.insertRow(index);

                    var name = pqDoc.participants[x];
                    var status = pqDoc.participantStatus[x];

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = name;
                    cell2.innerHTML = status;

                    var viewButton = document.createElement('button');
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
                        //report func
                    };
                    cell3.appendChild(viewButton);
                    cell3.appendChild(reportButton);
                    index++;
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

                    var table = document.getElementById('table');
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
                        //report func
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
            if (user.data.displayName == groupCreatorid) {
                console.log('In Owner Display');
                ownerDisplay();
            } else {
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

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    font-family: 'PT Serif', serif;
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
</style>
