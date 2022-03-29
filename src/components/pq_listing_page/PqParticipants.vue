<template>
    <div>
        <h1 id="Participants">Participants -> 0/100</h1>
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
            <button class="leave">Leave PQ</button>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
    name: 'Participants',
    mounted() {
        async function participantDisplay() {
            const db = getFirestore(firebaseApp);
            let docs = await getDocs(collection(db, 'Users'));
            let index = 1;

            docs.forEach(doc => {
                var data = doc.data();
                var table = document.getElementById('table');
                var row = table.insertRow(index);

                var name = data.username;
                var status = 'Confirmed';

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = name;
                cell2.innerHTML = status;
                cell3.className = 'view-manage-buttons';

                var viewButton = document.createElement('button');
                viewButton.className = 'bwt';
                viewButton.id = String(name);
                viewButton.innerHTML = 'View';
                viewButton.onclick = function() {
                    //open user profile
                };
                cell3.appendChild(viewButton);
                index++;
            });
        }
        async function ownerDisplay() {
            const db = getFirestore(firebaseApp);
            let docs = await getDocs(collection(db, 'Users'));
            let index = 1;

            docs.forEach(doc => {
                var data = doc.data();
                var table = document.getElementById('table');
                var row = table.insertRow(index);

                var name = data.username;
                var status = 'Confirmed';

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);

                cell1.innerHTML = name;
                cell2.innerHTML = status;
                cell3.className = 'view-manage-buttons';

                var viewButton = document.createElement('button');
                var manageButton = document.createElement('button');
                viewButton.className = 'bwt';
                viewButton.id = String(name);
                viewButton.innerHTML = 'View';
                viewButton.onclick = function() {
                    //open user profile
                };
                manageButton.className = 'bwt';
                manageButton.id = String(name);
                manageButton.innerHTML = 'Manage';
                manageButton.onclick = function() {
                    //open user profile
                };
                cell3.appendChild(viewButton);
                cell3.appendChild(manageButton);
                index++;
            });
        }
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                ownerDisplay(user.email);
            } else {
                participantDisplay(user.email);
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
    color: black;
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
