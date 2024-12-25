// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDXlUXPoT7bgxi5xMs3H8nQ6A9nuOoIYMk",
    authDomain: "http://clearfrost-solutions.firebaseapp.com/",
    databaseURL: "https://clearfrost-solutions-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "clearfrost-solutions",
    storageBucket: "http://clearfrost-solutions.firebasestorage.app/",
    messagingSenderId: "282562201905",
    appId: "1:282562201905:web:85b77c7f55e8d1b8c64810",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };