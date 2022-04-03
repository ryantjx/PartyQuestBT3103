import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import firebaseApp from './firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';
import PubNubVue from 'pubnub-vue';
import VueConfirmDialog from 'vue-confirm-dialog';
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';

Vue.config.productionTip = false;

const publish_Key = 'pub-c-67e1b963-c30c-47a5-a408-69f9db564ce5';
const subscribe_Key = 'sub-c-102352ec-a950-11ec-889c-728be7898cef';

// Make a unique uuid for each client
const myUuid = fourCharID();
const me = {
    uuid: myUuid,
};

try {
    if (!publish_Key || !subscribe_Key) {
        throw 'PubNub Keys are missing.';
    }
} catch (err) {
    console.log(err);
}

// ChatEngine injected into every component instance
Vue.use(
    VueConfirmDialog,
    PubNubVue,
    {
        subscribeKey: subscribe_Key,
        publishKey: publish_Key,
        ssl: true,
    },
    store
);
Vue.component('Modal', VueModal);
Vue.component('vue-confirm-dialog', VueConfirmDialog.default);
function created() {
    this.$store.commit('setMe', { me });
}

function fourCharID() {
    const maxLength = 4;
    const possible = 'abcdef0123456789';
    let text = '';

    for (let i = 0; i < maxLength; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

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
    created,
}).$mount('#app');
