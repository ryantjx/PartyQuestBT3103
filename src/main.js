import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';

Vue.config.productionTip = false;

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
    store.dispatch('fetchUser', user);
    console.log('Auth senses state change');
    console.log('user information is passed :', user);
    if (user != null) {
        console.log('user name is passed :', user.displayName);
    }
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
