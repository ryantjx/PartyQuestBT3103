<template>
    <div id="topbar">
        <br />
        <!-- <router-link to="/searchresults/">PQs</router-link> | -->
        <!-- <router-link to="/searchresults/user">Users</router-link> -->
        <SearchResultsTable />
    </div>
</template>

<script>
import SearchResultsTable from '../components/SearchResultsTable.vue';

export default {
    name: 'SearchTable',
    components: {
        SearchResultsTable,
    },
};
</script>
