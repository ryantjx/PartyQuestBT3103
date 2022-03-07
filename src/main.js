import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBwx5MJEaCHIPmISgfEfMePjQzazQiiu4o',
    authDomain: 'partyquest-14855.firebaseapp.com',
    projectId: 'partyquest-14855',
    storageBucket: 'partyquest-14855.appspot.com',
    messagingSenderId: '412429994347',
    appId: '1:412429994347:web:8807fa24e2a33fa08de42e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
