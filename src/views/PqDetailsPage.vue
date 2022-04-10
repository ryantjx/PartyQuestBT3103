<template>
    <div class="container">
        <PqHeader />
        <br />
        <PqPic />
        <br />
        <div class="row gutters">
            <PqDetails />
            <PqParticipants />
        </div>
        <br />
        <PqButtons />
    </div>
</template>

<script>
import PqDetails from '../../src/components/pq_details_page/PqDetails.vue';
import PqParticipants from '../../src/components/pq_details_page/PqParticipantsContainer.vue';
import PqPic from '../components/pq_details_page/PqPic.vue';
import PqHeader from '../components/pq_details_page/PqHeader.vue';
import PqButtons from '../components/pq_details_page/PqDetailBtn.vue';

export default {
    name: 'PqDetailsPage',
    components: { PqDetails, PqParticipants, PqPic, PqHeader, PqButtons },
};
</script>

<style scoped></style>
