<template>
  <!---<img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <SignUp2/>
  <LogIn2/>
  <!---<LogIn/>-->
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import SignUp2 from './components/SignUp2.vue'
//import LogIn from './components/LogIn.vue'
import LogIn2 from './components/LogIn2.vue'

export default {
  name: 'App',
  components: {
    SignUp2,
    LogIn2
    //LogIn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
