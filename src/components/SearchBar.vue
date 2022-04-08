<template>
    <div v-if="!$route.path.includes('/searchresults')" class="container">
        <form>
            <input
                id="search"
                type="search"
                placeholder="Search for brand"
                v-model="message"
                v-on:keydown.enter="pushToSearchResultsPage()"
            />
            <button type="submit" v-on:click="pushToSearchResultsPage()">
                Search
            </button>
        </form>
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
            // ** save as lowercase for better querying
            let x = this.message;
            let y = x.toLowerCase();
            store.state.searchText = y;
            // print out the user's input in the console to ensure data is being captured
            console.warn("User's input is", store.state.searchText);
            // push the user to the search results page if not already there
            this.$router.push('/searchresults');
        },
    },
};
</script>

<style scoped>
form {
    color: #555;
    text-align: left;
    display: inline-block;
    padding: 2px;
    border: 1px solid currentColor;
    margin-inline-start: 16px;
    border-radius: 4px 4px;
    /* width: 30vw; */
}
input[type='search'] {
    border: none;
    background: transparent;
    margin: 0;
    padding: 7px 7px;
    font-size: 14px;
    color: inherit;
    border: 1px solid transparent;
    border-radius: inherit;
    /* width: 27vw; */
}
input[type='search']::placeholder {
    color: #bbb;
}
button[type='submit'] {
    text-indent: -999px;
    overflow: hidden;
    width: 40px;
    padding: 0;
    margin: 0;
    border: 1px solid transparent;
    border-radius: inherit;
    background: transparent
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
        no-repeat center;
    cursor: pointer;
    opacity: 0.7;
}
button[type='submit']:hover {
    opacity: 1;
}
</style>
