//Store Firebase Script
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBwx5MJEaCHIPmISgfEfMePjQzazQiiu4o',
    authDomain: 'partyquest-14855.firebaseapp.com',
    projectId: 'partyquest-14855',
    storageBucket: 'partyquest-14855.appspot.com',
    messagingSenderId: '412429994347',
    appId: '1:412429994347:web:8807fa24e2a33fa08de42e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

//So the reason why we dont want to use import firebase is because the object is already initialised at the App.vue level -
//and if you constantly import firebase from 'firebase', it will slow down the web alot as we expand,
// because you are importing the whole firebase object at every page. you want to import only what is required.
