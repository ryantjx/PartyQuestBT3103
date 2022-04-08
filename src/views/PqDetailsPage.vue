<template>
    <div>
        <button
            type="button"
            id="submit"
            name="submit"
            class="btn-go-back"
            v-on:click="goBack()"
        >
            <i class="fa fa-arrow-left"></i>
        </button>
        <div class="container">
            <div id="topbar">
                <PqHeader />
                <div class="innercontainer">
                    <PqDetails />
                </div>
                <br /><br />
                <PqParticipants />
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
/* .background {
    background: #ccc;
    filter: blur(5px) brightness(0.5);
    position: absolute;
    top: 0;
    left: 0;
    height: 20%;
    width: 20%;
} */

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

.container {
    border-style: groove;
    border-radius: 16px 16px;
    padding-block-start: 16px;
    padding-block-end: 32px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    /* /background: rgb(200, 201, 200); */
}
</style>
