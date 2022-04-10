<template>
    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
        <div class="card h-100">
            <div class="card-body">
                <form id="editprofileform">
                    <div class="row gutters">
                        <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                        >
                            <h6
                                class="field"
                                id="title"
                                style="font-size:30px;"
                            ></h6>
                            <br />
                            <h6
                                class="field"
                                id="amt"
                                style="font-weight:bold;font-size:30px"
                            ></h6>
                            <br />
                            <div class="info-line">
                                <h6
                                    class="field"
                                    id="creator"
                                    style="font-size:18px"
                                >
                                    <i class="fa fa-user-circle-o"></i>
                                </h6>
                                <h6
                                    class="field"
                                    id="location"
                                    style="font-size:18px"
                                >
                                    <i class="fa fa-map-marker"></i>
                                </h6>
                                <h6
                                    class="field"
                                    id="brand"
                                    style="font-size:18px"
                                >
                                    <i class="fa fa-building"></i>
                                </h6>
                                <h6
                                    class="field"
                                    id="count"
                                    style="font-size:18px"
                                >
                                    <i class="fa fa-users"></i>
                                </h6>
                            </div>
                            <hr />
                        </div>
                        <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                        >
                            <h6 class="field" style="font-size:24px;">
                                PartyQuest Details
                            </h6>
                        </div>
                        <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                        >
                            <div>
                                <label class="fieldName">End Date:</label>
                                <br />
                                <label class="field" id="date"
                                    ><h5></h5>
                                    <br
                                /></label>
                            </div>
                            <br />

                            <div>
                                <label class="fieldName">Requirements:</label>
                                <br />
                                <label class="field" id="misc"><h5></h5></label>
                            </div>
                            <br />
                        </div>
                        <div
                            class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                        >
                            <div>
                                <label class="fieldName">Description:</label>
                                <br />
                                <label class="field" id="description"
                                    ><h5></h5>
                                    <br
                                /></label>
                            </div>
                            <br />
                            <div class="form-group">
                                <label class="fieldName"
                                    >Product Website:</label
                                >
                                <br />
                                <label class="field" id="url"
                                    ><h5 class="website"></h5
                                ></label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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

                let title = document.getElementById('title');
                document.getElementById('title').innerHTML = pqDoc.title;
                console.log(title.innerHTML);

                let brand = document.getElementById('brand');
                document.getElementById('brand').innerHTML =
                    brand.innerHTML + ' ' + pqDoc.brand;
                console.log(brand.innerHTML);

                let amt = document.getElementById('amt');
                console.log(amt.innerHTML);
                console.log('Changing');
                document.getElementById('amt').innerHTML =
                    '$ ' + pqDoc.totalAmount;
                console.log(amt.innerHTML);

                let participantCount = document.getElementById('count');
                participantCount.innerHTML =
                    participantCount.innerHTML +
                    ' ' +
                    pqDoc.participants.length +
                    '/' +
                    pqDoc.numOfPeople;

                let date = document.getElementById('date');
                document.getElementById('date').innerHTML = pqDoc.endDate;
                console.log(date.innerHTML);

                let location = document.getElementById('location');
                document.getElementById('location').innerHTML =
                    location.innerHTML + ' ' + pqDoc.collectionLocation;
                console.log(location.innerHTML);

                let creator = document.getElementById('creator');
                document.getElementById('creator').innerHTML =
                    creator.innerHTML + ' ' + pqDoc.groupCreatorid;
                console.log(creator.innerHTML);

                let url = document.getElementById('url');
                document.getElementById('url').innerHTML = pqDoc.itemLink;
                console.log(url.innerHTML);

                let description = document.getElementById('description');
                document.getElementById('description').innerHTML =
                    pqDoc.description;
                console.log(description.innerHTML);

                let misc = document.getElementById('misc');
                document.getElementById('misc').innerHTML = pqDoc.requirements;
                console.log(misc.innerHTML);
            });
        }
        display();
    },
};
</script>

<style scoped>
.website {
    max-width: 20px;
    word-wrap: break-word;
}

.form-group {
}

.field {
    max-width: 100%;
}

.info-line {
    display: flex;
    justify-content: space-between;
    width: 95%;
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

.details-line-1 {
    margin-block-start: 16px;
    margin-inline-start: 16px;
    margin-block-end: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
}
</style>
