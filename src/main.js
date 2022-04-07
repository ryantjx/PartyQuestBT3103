import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';
import VueConfirmDialog from 'vue-confirm-dialog';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; /* import font awesome icon component */
import {
    faUsers,
    faTruckFast,
    faHandshake,
} from '@fortawesome/free-solid-svg-icons';
library.add(faUsers, faTruckFast, faHandshake); /* icons */
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

// Make a unique uuid for each client

// ChatEngine injected into every component instance
Vue.use(
    VueConfirmDialog,
    {
        ssl: true,
    },
    store
);
Vue.component('Modal', VueModal);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);

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
    el: '#app',
    components: { App },
    template: '<App/>',
}).$mount('#app');
