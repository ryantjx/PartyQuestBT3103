<template>
    <div id="appbg">
        <vue-confirm-dialog></vue-confirm-dialog>
        <navbar />
        <br />
        <br />
        <br /><br />

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
    metaInfo: {
        title: 'PartyQuest',
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
/* body,
html {
    padding: 0;
    margin: 0;
    width: 100%;
    min-height: 100vh;
}
body {
    background: pink;
} */
body {
    padding: 0px;
    background: url('./assets/pubnub-filter-blocks-bg.png');
}

#appbg {
    position: relative;
    width: 100%;
    height: 100%;
    bottom: 0vh;
    background: url('./assets/test-bg-3.jpg');
    height: 100%;
    background-position: center;
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
