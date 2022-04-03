<template>
    <div id="topbar">
        <PqHeader />
        <div class="container">
            <PqDetails />
        </div>
        <br /><br />
        <PqParticipants />
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
.container {
    border-style: groove;
    border-radius: 16px 16px;
    padding-block-start: 16px;
    padding-block-end: 32px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
    /* /background: rgb(200, 201, 200); */
}
</style>
