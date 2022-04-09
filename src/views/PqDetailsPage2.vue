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
import PqDetails from '../../src/components/pq_details_page/PqDetails2.vue';
import PqParticipants from '../../src/components/pq_details_page/PqParticipants2.vue';
import PqPic from '../components/pq_details_page/PqPic.vue';
import PqHeader from '../components/pq_details_page/PqHeader2.vue';
import PqButtons from '../components/pq_details_page/PqDetailBtn.vue';

export default {
    name: 'PqDetails2',
    components: { PqDetails, PqParticipants, PqPic, PqHeader, PqButtons },
};
</script>

<style scoped></style>
