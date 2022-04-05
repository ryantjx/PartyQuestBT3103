<template>
    <div class="container">
        <NavBar />
        <h1>This is the landing page</h1>
    </div>
</template>

<script>
import NavBar from '../components/Navbar.vue';
export default {
    name: 'MyPQPage',
    components: {
        NavBar,
    },
};
</script>
