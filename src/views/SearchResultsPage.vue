<template>
    <div id="topbar">
        <h1>This is the Search Results Page</h1>
        <br />
        <router-link to="/searchresults/pq">PQs</router-link> |
        <router-link to="/searchresults/user">Users</router-link>
    </div>
</template>

<script>
export default {
    name: 'SearchResultsPage',
};
</script>
