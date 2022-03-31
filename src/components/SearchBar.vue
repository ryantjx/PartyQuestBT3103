<template>
    <div class="container">
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="searchbar">
            <i class="fa fa-search"></i>
            <input
                id="search"
                type="text"
                placeholder="Type here..."
                v-model="message"
                v-on:keydown.enter="pushToSearchResultsPage()"
            />
        </div>
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
.searchbar {
}

#search {
    background-color: white;
    border-color: black;
    padding: 12px 28px;
    text-align: left;
    display: inline-block;
    font-size: 16px;
    margin-inline-start: 16px;
    width: 30vw;
    border-radius: 4px 4px;
}
</style>
