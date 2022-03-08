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
