<template>
    <div id="party-quest-list">
        <ul
            id="v-for partyquests"
            style="list-style-type: none"
            text-align:centre
        >
            <!-- <li v-for="(value, index) in listdata" :key="index">
                {{ value }}
            </li> -->
            <div v-for="(value, index) in pqList" :key="index">
                <!-- <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img
                                :src="value.imageUrl"
                                class="img-fluid rounded-start"
                            />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ value.title }}</h5>
                                <p class="card-text">
                                    {{ value.description }}
                                </p>
                                <p class="card-text">
                                    <small class="text-muted"
                                        >Last updated 3 mins ago</small
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="container">
                    <div class="row justify-content-center mb-3">
                        <div class="col-md-12 col-xl-10">
                            <div class="card shadow-0 border rounded-3">
                                <div class="card-body">
                                    <div class="row">
                                        <div
                                            class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0"
                                        >
                                            <div
                                                class="bg-image hover-zoom ripple rounded ripple-surface"
                                            >
                                                <img
                                                    :src="value.imageUrl"
                                                    class="w-100"
                                                />
                                                <a href="#!">
                                                    <div class="hover-overlay">
                                                        <div
                                                            class="mask"
                                                            style="background-color: rgba(253, 253, 253, 0.15);"
                                                        ></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-lg-6 col-xl-6">
                                            <h5>{{ value.title }}</h5>
                                            <div class="d-flex flex-row">
                                                <div
                                                    class="mp-0 text-muted small"
                                                >
                                                    <p>
                                                        Brand:
                                                        {{ value.brand }}
                                                    </p>
                                                    <p>
                                                        Created by:
                                                        {{
                                                            value.groupCreatorid
                                                        }}
                                                    </p>
                                                    <p>
                                                        Location:
                                                        {{
                                                            value.collectionLocation
                                                        }}
                                                    </p>
                                                    <p>
                                                        Requirements:
                                                        {{ value.requirements }}
                                                    </p>
                                                    <p>
                                                        End Date:
                                                        {{ value.endDate }}
                                                    </p>
                                                    <p
                                                        class="text-truncate mb-4 mb-md-0"
                                                    >
                                                        Description:
                                                        {{ value.description }}
                                                    </p>
                                                </div>

                                                <!-- <div
                                                    class="text-danger mb-1 me-2"
                                                >
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                                <span>310</span> -->
                                            </div>
                                            <!-- <div
                                                class="mt-1 mb-0 text-muted small"
                                            ></div> -->

                                            <!-- <span>100% cotton</span>
                                                <span class="text-primary">
                                                    •
                                                </span>
                                                <span>Light weight</span>
                                                <span class="text-primary">
                                                    •
                                                </span>
                                                <span>Best finish<br /></span>
                                            </div>
                                            <div class="mb-2 text-muted small">
                                                <span>Unique design</span>
                                                <span class="text-primary">
                                                    •
                                                </span>
                                                <span>For men</span>
                                                <span class="text-primary">
                                                    •
                                                </span>
                                                <span>Casual<br /></span> -->
                                        </div>
                                        <div
                                            class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start"
                                        >
                                            <div
                                                class="d-flex flex-row align-items-center mb-1"
                                            >
                                                <p>
                                                    Number of Partipants:
                                                    {{
                                                        value.participants
                                                            .length
                                                    }}/{{ value.numOfPeople }}
                                                </p>
                                                <!-- <h4 class="mb-1 me-1">
                                                    $13.99
                                                </h4>
                                                <span class="text-danger"
                                                    ><s>$20.99</s></span
                                                > -->
                                            </div>
                                            <div>
                                                <div
                                                    v-if="
                                                        value.status ==
                                                            'Not Started'
                                                    "
                                                >
                                                    <h6 class="text-danger">
                                                        {{ value.status }}
                                                    </h6>
                                                </div>
                                                <div
                                                    v-else-if="
                                                        value.status ==
                                                            'In Progress'
                                                    "
                                                >
                                                    <h6 class="text-warning">
                                                        {{ value.status }}
                                                    </h6>
                                                </div>
                                            </div>
                                            <!-- <h6 class="text-success">
                                                Free shipping
                                            </h6> -->
                                            <div
                                                class="d-flex flex-column mt-4"
                                            >
                                                <button
                                                    class="btn btn-primary btn-sm"
                                                    type="button"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    class="btn btn-outline-primary btn-sm mt-2"
                                                    type="button"
                                                >
                                                    Add to wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script>
// console.log('passing data into partyquestlist');
import firebaseApp from '../firebase.js';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
const storage = getStorage(firebaseApp);

export default {
    name: 'PartyQuestList',
    props: {
        partyQuestData: {
            type: Array,
        },
    },
    data() {
        return {
            pqList: null,
        };
    },
    methods: {
        async display() {
            //obtain photo and pass it as a variable
            this.pqList = [];
            // console.log(
            //     'type of partyquestdata in pqbox ',
            //     this.partyQuestData
            // );
            var pqDataLength = this.partyQuestData.length;
            // Loop Through all party Quest data
            for (var i = 0; i < pqDataLength; i++) {
                var someMap = this.partyQuestData[i];
                // console.log('this is the map in partyquest list: ', someMap);
                var photoReference = ref(storage, someMap['photoId']);
                await getDownloadURL(photoReference).then(value => {
                    someMap['imageUrl'] = value;
                    // console.log(value);
                    this.pqList.push(someMap);
                });
                // console.log(
                //     'type of map in pqbox ',
                //     typeof JSON.parse(JSON.stringify(someMap))
                // );
                // console.log('number of people : ', someMap['numOfPeople']);
            }
            // console.log('values of pq in pqbox ', this.pqList);
        },
    },
    mounted() {
        // console.log('Data passed into the component', this.partyQuestData);
        if (this.partyQuestData) {
            this.display();
        }
    },
};
</script>

<style></style>
