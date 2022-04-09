<template>
    <div class="overall-detail-page">
        <div class="detail-page">
            <button
                type="button"
                id="submit"
                name="submit"
                class="btn-go-back"
                v-on:click="goBack()"
            >
                <i class="fa fa-arrow-left"></i>
            </button>
            <div class="pq-det-container">
                <div id="pq-det-container-entire">
                    <PqHeader />
                    <PqDetails />
                    <br /><br />
                    <PqParticipants />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PqHeader from '../components/pq_listing_page/PqHeader.vue';
import PqDetails from '../components/pq_listing_page/PqDetails.vue';
import PqParticipants from '../components/pq_listing_page/PqParticipants.vue';
export default {
    name: 'PqListingPage',
    components: {
        PqHeader,
        PqDetails,
        PqParticipants,
    },
    methods: {
        goBack() {
            // Returns back to the previous page
            this.$router.push('/searchresults');
            // Force the page to reload
            // window.onpopstate = function() {
            //     location.reload();
            // };
        },
    },
};
</script>

<style scoped>
.btn-go-back {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border: none;
    position: absolute;
    top: 15vh;
    background: none;
    padding: 32px 32px;
}

.overall-detail-page {
    display: flex;
    justify-content: center;
}

.detail-page {
    width: 60%;
}

.pq-det-container {
    border-style: groove;
    border-radius: 16px 16px;
    padding-block-start: 16px;
    padding-block-end: 32px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    background-color: white;
    /* /background: rgb(200, 201, 200); */
}
</style>
