<template>
    <div>
        <div class="text-center" id="buttons">
            <template v-if="this.userName == grpId">
                <!--For Owner View-->
                <template v-if="PQstatus == 'Not Started'">
                    <!--if status is not started -->
                    <button
                        v-on:click="
                            setStart();
                            confirmation();
                        "
                        class="start"
                    >
                        Start PQ
                    </button>
                    <button
                        v-on:click="
                            setLeave1();
                            confirmation();
                        "
                        class="leave"
                    >
                        Leave PQ
                    </button>
                </template>
                <template v-else>
                    <!-- if status is in progress, cannot leave -->
                    <template v-if="PQstatus == 'In Progress'">
                        <button
                            v-on:click="
                                setComplete();
                                confirmation();
                            "
                            class="complete"
                        >
                            Complete PQ
                        </button>
                    </template>
                </template>
            </template>

            <template v-else-if="this.participantCheck">
                <!--For Participant View-->
                <template v-if="this.personalStatus == 'Not Confirmed'">
                    <button
                        v-on:click="
                            setConfirm();
                            confirmation();
                        "
                        class="confirm"
                    >
                        Confirm Status
                    </button>
                </template>
                <template v-if="PQstatus == 'Not Started'">
                    <!-- can only leave if PQ is not started yet -->
                    <button
                        v-on:click="
                            setLeave2();
                            confirmation();
                        "
                        class="leave2"
                    >
                        Leave PQ
                    </button>
                </template>
            </template>
            <template v-else>
                <!--For Non - Participant View-->
                <template v-if="PQstatus == 'Not Started'">
                    <!-- can only join a PQ which is not started-->
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
            thirdCheck: null,
            personalStatus: null,
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
                            this.pushPage(uuid);
                        } catch (error) {
                            console.error('Error Updating doc');
                        }
                    } else {
                        try {
                            const docRef3 = await deleteDoc(
                                doc(db, 'PartyQuests', uuid)
                            );
                            console.log(docRef3);
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
                newStatus[currIndex] = 'Confirmed';
                this.participantStatus = newStatus;
                try {
                    const docRef = await updateDoc(pqRef, {
                        participantStatus: newStatus,
                    });
                    console.log(docRef);
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
                    try {
                        const docRef = await updateDoc(pqRef, {
                            participants: d,
                            participantStatus: e,
                        });
                        console.log(docRef);
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

            if (this.PQstatus == 'Not Started') {
                if (check) {
                    if (this.participants.length >= this.numOfPeople) {
                        //max num reached
                        alert('Sorry, this Party Quest is full');
                    } else {
                        //PQ is not full
                        let a = this.participants;
                        let b = this.participantStatus;
                        a.push(this.userName);
                        b.push('Not Confirmed');
                        var pqRef = doc(db, 'PartyQuests', uuid);
                        try {
                            const docRef = await updateDoc(pqRef, {
                                participants: a,
                                participantStatus: b,
                            });
                            console.log(docRef);
                            this.pushPage(uuid);
                        } catch (error) {
                            console.error('Error Updating doc');
                        }
                    }
                } else {
                    alert('You are already a member');
                }
            } else {
                console.log('Cannot join Completed/In Progress');
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
                this.participantStatus = e;

                var pqRef = doc(db, 'PartyQuests', uuid);

                try {
                    const docRef = await updateDoc(pqRef, {
                        participants: d,
                        participantStatus: e,
                    });
                    console.log(docRef);
                    this.pushPage(uuid);
                } catch (error) {
                    console.error('Error Updating doc');
                }
            } else {
                //participant not member
                alert('User is no longer in PQ');
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
                console.log(err);
            }
            this.showSecondModal = false;
        },

        setStart() {
            console.log('Set Start');
            this.thirdCheck = 'Start';
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
                let index = 0;
                let userIndex = null;
                pqDoc.participants.forEach(val => {
                    console.log('In for each loop');
                    console.log(val);
                    if (this.userName == val) {
                        this.participantCheck = true;
                        userIndex = index;
                    }
                    index++;
                });

                console.log(this.participantCheck);
                this.participants = pqDoc.participants;
                this.participantStatus = pqDoc.participantStatus;
                this.numOfPeople = pqDoc.numOfPeople;
                this.PQstatus = pqDoc.status;
                if (userIndex) {
                    //setting personal status
                    this.personalStatus = this.participantStatus[userIndex];
                }
            });
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

<style scoped>
.buttons {
    display: flex;
    justify-content: center;
}

.join {
    background-color: #6495ed;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    margin: 10px;
}

.leave,
.leave2 {
    background-color: red;
    border: none;
    color: white;
    padding: 15px 22px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    margin: 10px;
    width: 12vw;
}

.complete,
.start,
.confirm {
    background-color: green;
    border: none;
    color: white;
    padding: 15px 22px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    border-radius: 8px 8px;
    margin: 10px;
    width: 12vw;
}
</style>
