
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyC7ZRsipT3l0KuBk2GMhi1GphKLbWH1jy0",
    authDomain: "nodejs-95ecb.firebaseapp.com",
    projectId: "nodejs-95ecb",
    storageBucket: "nodejs-95ecb.appspot.com",
    messagingSenderId: "669432341466",
    appId: "1:669432341466:web:ef659c6c9a3cb71c1896e3",
    measurementId: "G-CL7HWC2Y4S",
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
