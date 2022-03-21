<template>
    <button id="btn" v-on:click="openCreatePQ()">
        Create
    </button>
</template>

<script>
export default {
    name: 'createPqButton',
    methods: {
        openCreatePQ: function() {
            this.$router.push({ name: 'CreatePQ' });
        },
    },
};
</script>

<style scoped>
#btn {
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
}
</style>
