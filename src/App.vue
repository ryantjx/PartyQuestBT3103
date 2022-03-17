<template>
    <div>
        <navbar></navbar>
        <infiniteScroll></infiniteScroll>
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import navbar from './components/Navbar';
import infiniteScroll from './components/InfiniteScroll';

export default {
    components: {
        navbar,
        infiniteScroll,
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

input {
    margin-right: 20px;
}
</style>
