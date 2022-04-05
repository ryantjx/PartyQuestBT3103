<template>
    <div>
        <div class="container">
            <form id="pqDetails">
                <h1 class="detailsheader">PartyQuest Details</h1>
                <div class="main">
                    <div class="pqdetailslist">
                        <br />
                        <label class="fieldName"> <h3>Brand:</h3></label>
                        <br />
                        <label class="field" id="brand"><h5></h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>Total Amount:</h3></label>
                        <br />
                        <label class="field" id="amt"><h5></h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>End Date:</h3></label>
                        <br />
                        <label class="field" id="date"><h5></h5></label>

                        <br /><br />

                        <label class="fieldName"
                            ><h3>Collection Location:</h3></label
                        >
                        <br />
                        <label class="field" id="location"><h5></h5></label>
                    </div>
                    <div class="pqdetailslist2">
                        <br />
                        <label class="fieldName"><h3>Creator:</h3></label>
                        <br />
                        <label class="field" id="creator"><h5></h5></label>

                        <br /><br />

                        <label class="fieldName"><h3>Website:</h3></label>
                        <br />
                        <label class="field" id="url"><h5></h5></label>

                        <br /><br />
                        <label class="fieldName"><h3>Description:</h3></label>
                        <br />
                        <label class="field" id="description"><h5></h5></label>

                        <br /><br />

                        <label class="fieldName"><h3>Requirements :</h3></label>
                        <br />
                        <label class="field" id="misc"><h5></h5></label>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../../firebase.js';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
var uuid;

export default {
    name: 'Details',

    data() {
        uuid = this.$route.params.id;
        return {
            id: this.$route.params.id,
        };
    },

    mounted() {
        async function display() {
            const db = getFirestore(firebaseApp);
            console.log('ID');
            console.log(uuid);
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

                let brand = document.getElementById('brand');
                document.getElementById('brand').innerHTML = pqDoc.brand;
                console.log(brand.innerHTML);

                let amt = document.getElementById('amt');
                console.log(amt.innerHTML);
                console.log('Changing');
                document.getElementById('amt').innerHTML =
                    '$ ' + pqDoc.totalAmount;
                console.log(amt.innerHTML);

                let date = document.getElementById('date');
                document.getElementById('date').innerHTML = pqDoc.endDate;
                console.log(date.innerHTML);

                let location = document.getElementById('location');
                document.getElementById('location').innerHTML =
                    pqDoc.collectionLocation;
                console.log(location.innerHTML);

                let creator = document.getElementById('creator');
                document.getElementById('creator').innerHTML =
                    pqDoc.groupCreatorid;
                console.log(creator.innerHTML);

                let url = document.getElementById('url');
                document.getElementById('url').innerHTML = pqDoc.itemLink;
                console.log(url.innerHTML);

                let description = document.getElementById('description');
                document.getElementById('description').innerHTML =
                    pqDoc.description;
                console.log(description.innerHTML);

                let misc = document.getElementById('misc');
                //let c = pqDoc.requirements.join(', ');
                //console.log(c);
                document.getElementById('misc').innerHTML = pqDoc.requirements;
                console.log(misc.innerHTML);
            });
        }
        display();
    },
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=PT+Serif&display=swap');
.detailsheader {
    /* font-family: 'Oswald', sans-serif; */
    font-family: 'PT Serif', serif;
}
.pqdetailslist {
    /* text-align: center;
    align-items: center; */
    margin: auto;
}

.pqdetailslist2 {
    /*text-align: center;
    align-items: center; */
    margin: auto;
    vertical-align: middle;
}

.main {
    display: flex;
    align-content: center;
}

.field {
    padding-inline-start: 8px;
    width: 100%;
    /* background: lightgrey; */
    border-radius: 8px 8px;
    padding-inline-end: auto;
    font-family: 'PT Serif', serif;
}

.fieldName {
    width: 100%;
    font-family: 'PT Serif', serif;
}
</style>
