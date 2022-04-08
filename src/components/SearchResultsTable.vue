<template>
    <div>
        <h3 class="pq-search-header">PartyQuest Search Results</h3>
        <br />
        <form class="search-res-form" @submit.prevent="searchByBrand">
            <input
                id="search"
                type="search"
                placeholder="Search by Brand ..."
                v-model="message"
                v-on:
                keyup.enter="searchByBrand()"
            />
            <button
                type="button"
                class="search-button"
                v-on:click="searchByBrand()"
            >
                Search
            </button>
            <br />
            <button id="btn" @click="$router.push('/searchresults/user')">
                Click to Search for Users Instead
            </button>
        </form>
        <table id="search-result-table" class="auto-index">
            <thead>
                <th></th>
                <th>Title</th>
                <th>Brand</th>
                <th>Creator</th>
                <th>Participants</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
            <tbody>
                <tr></tr>
            </tbody>
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
    name: 'SearchResultsTable',
    data() {
        return {
            message: '',
        };
    },
    mounted() {
        async function display() {
            // create query based on the given field
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('lowerBrand', '==', store.state.searchText)
            );
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            let idx = 1;

            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();
                var table = document.getElementById('search-result-table');
                var row = table.insertRow(idx);

                // get specified data from documents
                var title = pqDoc.title;
                var creator = pqDoc.groupCreatorid;
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
                var cell6 = row.insertCell(6);

                // populate the empty cells
                cell0.innerHTML = idx;
                cell1.innerHTML = title;
                cell2.innerHTML = brand;
                cell3.innerHTML = creator;
                cell4.innerHTML = participants;
                cell5.innerHTML = status;
                cell6.className = 'view-button';

                // create button for action column
                var viewButton = document.createElement('button');
                viewButton.className = 'bwt';
                viewButton.id = String(docs.id);
                viewButton.innerHTML = 'View';
                viewButton.onclick = function() {
                    console.log('this is the partyquest id', docs.id);
                    alert('pause the load');
                    window.location.replace('/pq/' + docs.id);
                };
                // add button to action column cell
                cell6.appendChild(viewButton);

                // increase counter (s/no.)
                idx += 1;
                console.log(pqDoc);
            });
            console.warn('End of display()');
        }
        // call the display function when the page is opened
        display();
    },
    methods: {
        clearTable() {
            console.warn('tryna clear the table');
            var table = document.getElementById('search-result-table');
            var rowCount = table.rows.length;
            while (--rowCount) {
                table.deleteRow(rowCount);
            }
        },
        async searchByBrand() {
            // clear the existing rows in the table first
            this.clearTable();
            // save user's input to state manager (vuex)
            // save as lowercase for better querying
            let x = this.message;
            let y = x.toLowerCase();
            store.state.searchText = y;
            // print out the user's input in the console to ensure data is being captured
            console.warn("User's input is", store.state.searchText);
            // create query based on the given field
            let filterQuery = query(
                collection(db, 'PartyQuests'),
                where('lowerBrand', '==', y)
            );
            // use query to filter the documents in the PQ collection
            let querySnapshot = await getDocs(filterQuery);
            let idx = 1;
            // iterate over the filtered documents
            querySnapshot.forEach(docs => {
                // get documents
                let pqDoc = docs.data();
                var table = document.getElementById('search-result-table');
                var row = table.insertRow(idx);

                // get specified data from documents
                var title = pqDoc.title;
                var creator = pqDoc.groupCreatorid;
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
                var cell6 = row.insertCell(6);

                // populate the empty cells
                cell0.innerHTML = idx;
                cell1.innerHTML = title;
                cell2.innerHTML = brand;
                cell3.innerHTML = creator;
                cell4.innerHTML = participants;
                cell5.innerHTML = status;
                cell6.className = 'view-button';

                // create button for action column
                var viewButton = document.createElement('button');
                viewButton.className = 'bwt';
                viewButton.id = String(docs.id);
                viewButton.innerHTML = 'View';
                viewButton.onclick = function() {
                    window.location.replace('/pq/' + docs.id);
                };
                // add button to action column cell
                cell6.appendChild(viewButton);

                // increase counter (s/no.)
                idx += 1;
                console.log(pqDoc);
            });
            console.warn('End of searchByBrand() function');
        },
    },
};
</script>

<style>
#search-result-table {
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

#search-result-table thead tr {
    background-color: #89d5df;
    color: #422f06;
    text-align: left;
}

#search-result-table th,
#search-result-table td {
    padding: 12px 15px;
}

#search-result-table tr {
    border-bottom: 1px solid #dddddd;
}

#search-result-table tr:first-of-type {
    background-color: #f3f3f3;
}

#search-result-table tr:nth-of-type(even) {
    background-color: #fdfcfce7;
}

#search-result-table tr:nth-of-type(odd) {
    background-color: #f3f3f3;
}

#search-result-table tr:last-of-type {
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
.pq-search-header {
    text-align: center;
}
.search-res-form {
    color: #555;
    display: flex;
    padding: 2px;
    border: 1px solid currentColor;
    border-radius: 5px;
    width: 20%;
    margin-left: 40%;
}
input[type='search'] {
    border: none;
    background: transparent;
    margin: 0;
    padding: 7px 8px;
    font-size: 14px;
    color: inherit;
    border: 1px solid transparent;
    border-radius: inherit;
    width: 27vw;
}
input[type='search']::placeholder {
    color: #bbb;
}
.search-button {
    text-indent: -999px;
    overflow: hidden;
    width: 40px;
    padding: 0;
    margin: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    background: transparent
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat center;
    cursor: pointer;
    opacity: 0.7;
}
.search-button:hover {
    opacity: 1;
}
#btn {
    background-color: burlywood; /* Green */
    border: none;
    color: white;
    padding: 12px 20;
    border-radius: 6px 6px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: auto;
}
</style>
