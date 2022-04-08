<template>
    <div class="detailpage">
        <h1 id="Participants"></h1>
        <table id="table-participants" class="auto-index">
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </table>

        <br /><br />
        <div class="container" id="buttons">
            <template v-if="userName == grpId">
                <!--For Owner View-->
                <template v-if="PQstatus == 'Not Started'">
                    <!--if status is not started -->
                    <div class="buttons">
                        <button
                            v-on:click="
                                setStart();
                                confirmation();
                            "
                            class="start"
                        >
                            Start PQ
                        </button>
                    </div>
                    <div class="buttons">
                        <button
                            v-on:click="
                                setLeave1();
                                confirmation();
                            "
                            class="leave"
                        >
                            Leave PQ
                        </button>
                    </div>
                </template>
                <template v-else>
                    <!-- if status is in progress, cannot leave -->
                    <template v-if="PQstatus == 'In Progress'">
                        <div class="buttons">
                            <button
                                v-on:click="
                                    setComplete();
                                    confirmation();
                                "
                                class="complete"
                            >
                                Complete PQ
                            </button>
                        </div>
                    </template>
                </template>
            </template>
            <template v-else-if="this.participantCheck">
                <!--For Participant View-->
                <div class="buttons">
                    <button
                        v-on:click="
                            setConfirm();
                            confirmation();
                        "
                        class="confirm"
                    >
                        Confirm Status
                    </button>
                    <template v-if="PQstatus == 'Not Started'">
                        <button
                            v-on:click="
                                setLeave2();
                                confirmation();
                            "
                            class="leave2"
                        >
                            Leave PQ2
                        </button>
                    </template>
                </div>
            </template>
            <template v-else>
                <!--For Non - Participant View-->
                <div class="buttons">
                    <button
                        v-on:click="
                            setJoin();
                            confirmation();
                        "
                        class="join"
                    >
                        Join
                    </button>
                </div>
            </template>
            <template v-if="this.saveCheck">
                <!-- check whether PQ is currently saved -->
                <div class="buttons">
                    <button
                        v-on:click="
                            setUnsave();
                            confirmation();
                        "
                        class="unsave"
                    >
                        Unsave PQ
                    </button>
                </div>
            </template>
            <template v-else>
                <div class="buttons">
                    <button
                        v-on:click="
                            setSave();
                            confirmation();
                        "
                        class="save"
                    >
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
                <Modal v-model="showThirdModal" title="Confirmation">
                    <form novalidate>
                        <template v-if="this.thirdCheck == 'Join'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are joining this PQ
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Confirm'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are confirming your status
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Complete'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are completing the PartyQuest
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Leave1'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are leaving the PartyQuest. The
                                    PartyQuest will be deleted.
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Leave2'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are leaving the PartyQuest
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Start'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are starting the PartyQuest. No further
                                    changes can be made.
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Save'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are saving this PartyQuest
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Unsave'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are removing this PartyQuest from your
                                    saved PartyQuests.
                                </label>
                            </div>
                        </template>
                        <template v-else-if="this.thirdCheck == 'Kick'">
                            <div class="form-group">
                                <label for="formField1"
                                    >You are kicking this user out.
                                </label>
                            </div>
                        </template>
                        <div class="row modal-footer">
                            <div class="col-sm-12">
                                <div class="float-right">
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        @click="submit2()"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        class="btn btn-secondary ml-2"
                                        type="button"
                                        @click="cancel2()"
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
import { getFirestore, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { collection, getDocs, query, where, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
var uuid;

const db = getFirestore(firebaseApp);

export default {
    name: 'Participants',

    data() {
        uuid = this.$route.params.id;
        return {
            id: this.$route.params.id,
            grpId: '',
            userName: '',
            participantCheck: false,
            showSecondModal: false,
            saveCheck: false,
            PQstatus: null,
            showThirdModal: false,
        };
    },
    methods: {
        //all functions need method to reload page
        async handleStart() {
            let currNum = this.participants.length;
            let total = parseInt(this.numOfPeople);
            console.log(currNum);
            console.log(total);
            if (currNum == total) {
                console.log('Max participants reached');
                alert('Max Participants reached');
                //max capacity reached, check whether all have confirmed
                let check = true;
                let index = 1;
                this.participantStatus.forEach(status => {
                    console.log(status);
                    if (status == 'Not Confirmed') {
                        if (index == 1) {
                            //owner, who will only confirm when completing
                            //TO ADD: owner status change
                            index++;
                        } else {
                            check = false;
                            index++;
                        }
                    }
                });

                if (this.PQstatus == 'Not Started') {
                    if (check) {
                        //all other users have confirmed, owner can confirm and start PQ
                        var pqRef = doc(db, 'PartyQuests', uuid);

                        try {
                            const docRef = await updateDoc(pqRef, {
                                status: 'In Progress',
                            });
                            console.log(docRef);
                            console.log('Trying to update doc');
                            alert('Party Quest has been started');
                            this.pushPage(uuid);
                        } catch (error) {
                            console.error('Error Updating doc');
                        }
                    } else {
                        alert('Not all participants have confirmed yet');
                    }
                } else {
                    alert('PQ has already been started');
                }
            } else {
                console.log('Not enough participants');
                alert('Not enough participants');
            }
        },
        //for owner to change status of PQ once all have confirmed (Either Not confirmed or confirmed)
        async handleComplete() {
            //current status must be In Progress/Complete
            //bring check into start function
            let check = true;
            let index = 1;
            this.participantStatus.forEach(status => {
                console.log(status);
                if (status == 'Not Confirmed') {
                    if (index == 1) {
                        //owner, who will only confirm when completing
                        //TO ADD: owner status change
                        index++;
                    } else {
                        check = false;
                        index++;
                    }
                }
            });
            if (this.PQstatus != 'Completed') {
                if (check) {
                    var pqRef = doc(db, 'PartyQuests', uuid);

                    try {
                        const docRef = await updateDoc(pqRef, {
                            status: 'Completed',
                        });
                        console.log(docRef);
                        console.log('Trying to update doc');
                        alert('Status Updated');
                        this.pushPage(uuid);
                    } catch (error) {
                        console.error('Error Updating doc');
                    }
                    //if all participants confirmed
                    //update firebase status
                } else {
                    alert('Not all participants have confirmed');
                }
            } else {
                alert('PQ is already completed');
            }
        },

        async handleLeave() {
            //leave for owner
            //leave PQ and pass down 'ownership' to next participant
            //change creator id and remove status and name
            let check = false;
            this.participants.forEach(participant => {
                if (participant == this.userName) {
                    check = true;
                }
            });

            let currStatus = false;
            if (this.PQstatus == 'Not Started') {
                currStatus = true;
            }

            if (currStatus) {
                if (check) {
                    //you are owner of pq
                    var pqRef = doc(db, 'PartyQuests', uuid);
                    if (this.participants.length > 1) {
                        //can pass down ownership
                        let a = this.participants[1];
                        console.log('Replacement is ', a);

                        let d = [];
                        let e = [];
                        for (let x = 0; x < this.participants.length; x++) {
                            if (this.participants[x] == this.grpId) {
                                console.log('current user is creator');
                            } else {
                                //create new array with all other participants and status
                                d.push(this.participants[x]);
                                e.push(this.participantStatus[x]);
                            }
                        }
                        console.log('After removing', d);
                        console.log('After removing status', e);
                        this.grpId = a;

                        try {
                            const docRef = await updateDoc(pqRef, {
                                groupCreatorid: a,
                                participants: d,
                                participantStatus: e,
                            });
                            console.log(docRef);
                            console.log('Trying to update doc');
                            alert('Status Updated');
                            this.pushPage(uuid);
                        } catch (error) {
                            console.error('Error Updating doc');
                        }
                    } else {
                        try {
                            const docRef3 = await deleteDoc(
                                doc(db, 'PartyQuests', uuid)
                            );
                            alert('PQ deleted');
                            console.log(docRef3);
                            console.log('Trying to update doc');
                            this.pushPage2();
                        } catch (error) {
                            console.error('Error Updating doc');
                        }
                    }
                } else {
                    alert('You are not the owner of this PQ');
                }
            } else {
                alert('You cannot leave a PQ that is in progress/completed');
            }
        },

        async handleConfirm() {
            let index = 0;
            let currIndex = null;
            this.participants.forEach(participant => {
                if (participant == this.userName) {
                    //at current user
                    console.log('At Index of current user');
                    currIndex = index;
                    index++;
                } else {
                    index++;
                }
            });
            //check type of this.participantsStatus
            //edit status at index found
            //update status in document
            if (this.participantStatus[currIndex] == 'Not Confirmed') {
                var pqRef = doc(db, 'PartyQuests', uuid);
                let newStatus = this.participantStatus;
                console.log(newStatus[currIndex]);
                newStatus[currIndex] = 'Confirmed';
                console.log(newStatus[currIndex]);
                this.participantStatus = newStatus;
                try {
                    const docRef = await updateDoc(pqRef, {
                        participantStatus: newStatus,
                    });
                    console.log(docRef);
                    console.log('Trying to update doc');
                    alert('Status Updated');
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                alert('You have already confirmed');
            }
        },

        async handleLeave2() {
            //leave for normal participants
            //remove participant and status from pq
            //leave for owner
            //leave PQ and pass down 'ownership' to next participant
            //change creator id and remove status and name
            let check = false;
            this.participants.forEach(participant => {
                if (participant == this.userName) {
                    check = true;
                }
            });

            let currStatus = false;
            if (this.PQstatus == 'Not Started') {
                currStatus = true;
            }

            if (currStatus) {
                if (check) {
                    //you are participant in pq
                    var pqRef = doc(db, 'PartyQuests', uuid);
                    let d = [];
                    let e = [];
                    for (let x = 0; x < this.participants.length; x++) {
                        if (this.participants[x] == this.userName) {
                            console.log('current user');
                        } else {
                            //create new array with all other participants and status
                            d.push(this.participants[x]);
                            e.push(this.participantStatus[x]);
                        }
                    }
                    console.log('After removing', d);
                    console.log('After removing status', e);
                    try {
                        const docRef = await updateDoc(pqRef, {
                            participants: d,
                            participantStatus: e,
                        });
                        console.log(docRef);
                        console.log('Trying to update doc');
                        alert('Status Updated');
                        this.pushPage(uuid);
                    } catch (error) {
                        console.error('Error Updating doc');
                    }
                } else {
                    //you are not participant in PQ
                    alert('You did not join this PQ');
                }
            }
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

        pushPage2() {
            window.location.replace('/home');
        },
        async handleJoin() {
            //check if max number of participants
            //then add user to list of participants and participant status
            let check = true;
            this.participants.forEach(participant => {
                if (participant == this.userName) {
                    check = false;
                }
            });
            if (check) {
                if (this.participants.length >= this.numOfPeople) {
                    //max num reached
                    alert('Sorry, this Party Quest is full');
                } else {
                    //PQ is not full
                    let a = this.participants;
                    console.log('Initial A is', a);
                    let b = this.participantStatus;
                    console.log('Initial B is', b);
                    a.push(this.userName);
                    b.push('Not Confirmed');
                    console.log('Curr A is', a);
                    console.log('Curr B is', b);
                    var pqRef = doc(db, 'PartyQuests', uuid);
                    try {
                        const docRef = await updateDoc(pqRef, {
                            participants: a,
                            participantStatus: b,
                        });
                        console.log(docRef);
                        console.log('Trying to update doc');
                        alert('Joined Party Quest');
                        this.pushPage(uuid);
                    } catch (error) {
                        console.error('Error Updating doc');
                    }
                }
            } else {
                alert('You are already a member');
            }
        },

        async handleKick(x) {
            //then remove user from list of participants and participant status
            let check = false;
            this.participants.forEach(participant => {
                if (participant == x) {
                    check = true;
                }
            });
            if (check) {
                //if participant is member of PQ
                let d = [];
                let e = [];

                for (let y = 0; y < this.participants.length; y++) {
                    if (this.participants[y] == x) {
                        console.log('user to remove');
                    } else {
                        //create new array with all other participants and status
                        d.push(this.participants[y]);
                        e.push(this.participantStatus[y]);
                    }
                }
                console.log('After removing', d);
                console.log('After removing status', e);
                this.participants = d;
                this.participants = e;

                var pqRef = doc(db, 'PartyQuests', uuid);

                try {
                    const docRef = await updateDoc(pqRef, {
                        participants: d,
                        participantStatus: e,
                    });
                    console.log(docRef);
                    console.log('Trying to update doc');
                    alert('Participant Kicked');
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                //participant not member
                alert('User is no longer in PQ');
            }
        },

        async handleSave() {
            //save pq uuid to a new field within user
            //we allow for them to save their own PQ, jic they want to keep track of it
            //if already saved then handle error
            if (!this.saveCheck) {
                //PQ can be saved
                this.clearTable();
                let a = this.savedPQ;
                console.log('Curr Saved');
                console.log(a);
                if (a.length > 0) {
                    a.push(uuid);
                } else {
                    a = [uuid];
                }

                console.log(a);
                this.savedPQ = a;
                var userRef = doc(db, 'Users', this.userName);
                try {
                    const docRef = await updateDoc(userRef, {
                        savedPartyQuests: a,
                    });
                    console.log(docRef);
                    console.log('Trying to update doc');
                    alert('PQ saved');
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                //PQ cannot be saved
                alert('PQ is already saved');
            }
        },

        async handleUnsave() {
            //when user has saved PQ, remove from saved PQ
            let check = false;
            if (this.savedPQ.length > 0) {
                //savedPQ list is not null
                this.savedPQ.forEach(pq => {
                    if (pq == uuid) {
                        //already saved current PQ
                        console.log('Already Saved Current PQ');
                        check = true;
                    }
                });
            }
            if (check) {
                //PQ is in list so can remove it
                this.clearTable();
                let c = this.savedPQ;
                console.log('Curr Saved');
                console.log(c);
                let d = [];
                d.forEach(pq => {
                    if (pq == uuid) {
                        console.log('current pq');
                    } else {
                        d.push(pq);
                    }
                });
                console.log(d);

                var userRef = doc(db, 'Users', this.userName);
                try {
                    const docRef = await updateDoc(userRef, {
                        savedPartyQuests: d,
                    });
                    console.log(docRef);
                    console.log('Trying to update doc');
                    alert('Status Updated');
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                //PQ cannot be saved
                alert('PQ is not saved');
            }
        },

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

        setStart() {
            console.log('Set Start');
            this.thirdCheck = 'Start';
        },

        setSave() {
            console.log('Set Save');
            this.thirdCheck = 'Save';
        },

        setUnsave() {
            console.log('Set Unsave');
            this.thirdCheck = 'Unsave';
        },

        setLeave1() {
            console.log('Set Leave1');
            this.thirdCheck = 'Leave1';
        },

        setLeave2() {
            console.log('Set Leave2');
            this.thirdCheck = 'Leave2';
        },

        setComplete() {
            console.log('Set Complete');
            this.thirdCheck = 'Complete';
        },

        setConfirm() {
            console.log('Set Confirm');
            this.thirdCheck = 'Confirm';
        },

        setJoin() {
            console.log('Set Join');
            this.thirdCheck = 'Join';
        },

        async submit2() {
            if (this.thirdCheck == 'Kick') {
                await this.handleKick();
            } else if (this.thirdCheck == 'Unsave') {
                await this.handleUnsave();
            } else if (this.thirdCheck == 'Save') {
                await this.handleSave();
            } else if (this.thirdCheck == 'Start') {
                await this.handleStart();
            } else if (this.thirdCheck == 'Leave1') {
                await this.handleLeave();
            } else if (this.thirdCheck == 'Leave2') {
                await this.handleLeave2();
            } else if (this.thirdCheck == 'Complete') {
                await this.handleComplete();
            } else if (this.thirdCheck == 'Confirm') {
                await this.handleConfirm();
            } else if (this.thirdCheck == 'Join') {
                await this.handleJoin();
            } else {
                alert('Check is null');
            }
            this.showThirdModal = false;
        },

        cancel() {
            this.showSecondModal = false;
        },
        reportUser() {
            this.showSecondModal = true;
        },

        cancel2() {
            this.showThirdModal = false;
            this.thirdCheck = null;
        },

        confirmation() {
            this.showThirdModal = true;
        },

        async test() {
            const db = getFirestore(firebaseApp);
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('partyQuestid', '==', uuid)
            );
            console.log('filterquery');
            console.log(filterQuery);

            let querySnapshot = await getDocs(filterQuery);
            querySnapshot.forEach(docs => {
                //get documents
                let pqDoc = docs.data();
                this.grpId = pqDoc.groupCreatorid;
                pqDoc.participants.forEach(val => {
                    console.log('In for each loop');
                    console.log(val);
                    if (this.userName == val) {
                        this.participantCheck = true;
                    }
                });

                console.log(this.participantCheck);
                this.participants = pqDoc.participants;
                this.participantStatus = pqDoc.participantStatus;
                this.numOfPeople = pqDoc.numOfPeople;
                this.PQstatus = pqDoc.status;
            });
            let filterQuery2 = query(
                collection(db, 'Users'),
                where('username', '==', this.userName)
            );
            console.log('filterquery2');
            console.log(filterQuery2);
            let querySnapshot2 = await getDocs(filterQuery2);
            querySnapshot2.forEach(docs => {
                //get documents
                let pqDoc2 = docs.data();
                this.savedPQ = pqDoc2.savedPartyQuests;
                if (this.savedPQ.length > 0) {
                    //array not empty
                    this.savedPQ.forEach(pq => {
                        if (pq == uuid) {
                            //pq is already saved
                            this.saveCheck = true;
                        }
                    });
                }
            });
            await this.participantDisplay();
        },

        async participantDisplay() {
            const page = this;
            let index1 = 1;
            console.log('Num of Participants', this.participants);
            for (let x = 0; x < this.participants.length; x++) {
                console.log(x);
                console.log(this.participants[x]);
                console.log(this.participantStatus[x]);
                let ppl = document.getElementById('Participants');
                let a =
                    'Participants: ' +
                    this.participants.length +
                    '/' +
                    this.numOfPeople;
                document.getElementById('Participants').innerHTML = a;
                console.log(ppl.innerHTML);

                var table = document.getElementById('table-participants');
                var row = table.insertRow(index1);

                var name = this.participants[x];
                var status = this.participantStatus[x];

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = name;
                cell2.innerHTML = status;
                //first check if its current user
                if (this.userName == name) {
                    console.log('Current User Functions');
                    console.log('No functions');
                    index1++;
                } else {
                    if (this.participantCheck) {
                        //Check for Owner or Participant
                        if (this.grpId == this.userName) {
                            //if owner report view kick
                            console.log('Owner Table Functions');

                            var viewButton = document.createElement('button');
                            viewButton.className = 'bwt';
                            viewButton.id = String(name);
                            viewButton.innerHTML = 'View';
                            viewButton.onclick = function() {
                                window.location.replace(
                                    '/profile/user/' + this.participants[x]
                                );
                            };

                            var reportButton = document.createElement('button');
                            reportButton.className = 'bwt';
                            reportButton.id = String(name);
                            reportButton.innerHTML = 'Report';
                            reportButton.onclick = function() {
                                page.reportUser();
                            };

                            var kickButton = document.createElement('button');
                            kickButton.className = 'bwt';
                            kickButton.id = String(name);
                            kickButton.innerHTML = 'Kick';
                            kickButton.onclick = function() {
                                page.confirmation();
                                this.thirdCheck = 'Kick';
                            };
                            //this.participants[x]
                            //);

                            cell3.appendChild(viewButton);
                            cell3.appendChild(reportButton);
                            cell3.appendChild(kickButton);
                            index1++;
                        } else {
                            //if participant report view
                            console.log('Participant Table Functions');
                            var viewButton2 = document.createElement('button');
                            viewButton2.className = 'bwt';
                            viewButton2.id = String(name);
                            viewButton2.innerHTML = 'View';
                            viewButton2.onclick = function() {
                                window.location.replace(
                                    '/profile/user/' + this.participants[x]
                                );
                            };

                            var reportButton2 = document.createElement(
                                'button'
                            );
                            reportButton2.className = 'bwt';
                            reportButton2.id = String(name);
                            reportButton2.innerHTML = 'Report';
                            reportButton2.onclick = function() {
                                page.reportUser();
                            };
                            cell3.appendChild(viewButton2);
                            cell3.appendChild(reportButton2);
                            index1++;
                        }
                    } else {
                        //check for non-participant view
                        console.log('Non-Participant Table Functions');
                        var viewButton3 = document.createElement('button');
                        viewButton3.className = 'bwt';
                        //viewButton3.id = String(name);
                        viewButton3.innerHTML = 'View';
                        viewButton3.onclick = function() {
                            window.location.replace(
                                '/profile/user/' + this.participants[x]
                            );
                        };

                        cell3.appendChild(viewButton3);
                        index1++;
                    }
                }
            }
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
                this.test();
            }
        });
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

.complete {
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

.start {
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
.unsave {
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
    background-color: rgb(231, 117, 72);
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
    background-color: rgb(65, 188, 228);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}
.confirm {
    background-color: rgb(73, 239, 73);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
}

.leave2 {
    background-color: rgb(208, 208, 78);
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
