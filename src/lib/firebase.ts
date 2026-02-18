import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyC4HD9e1-FAIjGgUaH3qz_WQRp8gFWU1-s",
    authDomain: "ruralreachsite.firebaseapp.com",
    projectId: "ruralreachsite",
    storageBucket: "ruralreachsite.firebasestorage.app",
    messagingSenderId: "151984296765",
    appId: "1:151984296765:web:02959e5051add2908ceb54",
    measurementId: "G-GEEG2CBPJ3"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
console.log("Firebase initialized:", app.options.projectId);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

console.log("Firestore Instance created");

export { auth, db, storage, functions };
