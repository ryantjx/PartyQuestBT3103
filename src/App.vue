<template>
    <div id="appbg">
        <vue-confirm-dialog></vue-confirm-dialog>
        <navbar />
        <br />
        <br />
        <hr />
        <main class="py-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import navbar from './components/Navbar';

export default {
    components: {
        navbar,
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
    background: url('./assets/pubnub-filter-blocks-bg.png');
}

body {
    background: url('./assets/pubnub-filter-blocks-bg.png');
}

#menuitem {
    color: green;
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

button {
    color: #2c3e50;
}
</style>
