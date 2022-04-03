<template>
    <div id="topbar">
        <h1>This is the My PQs Page</h1>
        <br />
        <router-link to="/mypq/CreatedPQPage">Created PQs</router-link> |
        <router-link to="/mypq/JoinedPQPage">Joined PQs</router-link> |
        <router-link to="/mypq/saved">Saved PQs</router-link>
    </div>
</template>

<script>
export default {
    name: 'MyPQPage',
};
</script>
