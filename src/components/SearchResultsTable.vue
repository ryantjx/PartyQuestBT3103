<template>
    <div>
        <!-- <div class="action_btns">
            <button
                name="submit"
                class="btn1"
                type="submit"
                @click="function1()"
            >
                Title
            </button>
            <button
                name="submit"
                class="btn2"
                type="submit"
                @click="function2()"
            >
                Brand
            </button>
        </div> -->
        <table id="table" class="auto-index">
            <thead>
                <tr>
                    <th></th>
                    <th>Brand</th>
                    <th>Creator</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
// import the necessary modules
import firebaseApp from '../firebase.js';
import store from '../store';
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

// get entire database
const db = getFirestore(firebaseApp);

export default {
    mounted() {
        async function display() {
            // create query
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('brand', '==', store.state.searchText)
            );
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            let idx = 1;

            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();
                var table = document.getElementById('table');
                var row = table.insertRow(idx);

                // get specified data from documents
                var creator = pqDoc.groupCreatorId;
                var brand = pqDoc.brand;
                var status = pqDoc.status;
                var participants = pqDoc.participants.length;

                // create empty cells to be filled later
                var cell0 = row.insertCell(0);
                var cell1 = row.insertCell(1);
                var cell2 = row.insertCell(2);
                var cell3 = row.insertCell(3);
                var cell4 = row.insertCell(4);
                var cell5 = row.insertCell(5);

                // populate the empty cells
                cell0.innerHTML = idx;
                cell1.innerHTML = brand;
                cell2.innerHTML = creator;
                cell3.innerHTML = participants;
                cell4.innerHTML = status;
                cell5.className = 'view-button';

                var viewButton = document.createElement('button');
                viewButton.className = 'bwt';
                viewButton.id = String(docs.id);
                viewButton.innerHTML = 'View';
                viewButton.onclick = function() {
                    window.location.replace('/pq/' + docs.id);
                };
                cell5.appendChild(viewButton);
                // increase counter (s/no.)
                idx += 1;
                console.log(pqDoc);
            });
        }
        // call the display function when the page is opened
        display();
    },
};
</script>

<style>
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

#table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

#table thead tr {
    background-color: #89d5df;
    color: #422f06;
    text-align: left;
}

#table th,
#table td {
    padding: 12px 15px;
}

#table tr {
    border-bottom: 1px solid #dddddd;
}

#table tr:first-of-type {
    background-color: #f3f3f3;
}

#table tr:nth-of-type(even) {
    background-color: #fdfcfce7;
}

#table tr:nth-of-type(odd) {
    background-color: #f3f3f3;
}

#table tr:last-of-type {
    border-bottom: 2px solid #89d5df;
}
.action_btns {
    width: 100%;
    margin: 0;
    position: absolute;
    top: 15%;
    left: 45%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
