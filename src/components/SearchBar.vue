<template>
    <div class="container">
        <input
            id="search"
            type="text"
            placeholder="Type here..."
            v-model="message"
            v-on:keydown.enter="pushToSearchResultsPage()"
        />
    </div>
</template>

<script>
import store from '../store';

export default {
    name: 'SearchBar',
    data() {
        return {
            message: '',
        };
    },
    methods: {
        pushToSearchResultsPage() {
            // save user's input to state manager (vuex)
            store.state.searchText = this.message;
            // print out the user's input in the console to ensure data is being captured
            console.warn("User's input is", store.state.searchText);
            // push the user to the search results page
            this.$router.push('/searchresults').catch(() => {});
            // reset input field
            document.getElementById('search').value = '';
        },
    },
};
</script>

<style scoped>
#search {
    background-color: white;
    border-color: black;
    padding: 15px 32px;
    text-align: center;
    display: inline-block;
    font-size: 16px;
}
</style>
