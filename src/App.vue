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
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background: url('./assets/pubnub-filter-blocks-bg.png');
}

html,
body {
    margin: 0;
    font-family: 'Fira Sans', sans-serif;
    height: 100%;
}

#appbg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0vh;
    bottom: 0vh;
    background: url('./assets/test-bg-3.jpg');
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
