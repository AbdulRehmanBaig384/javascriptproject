import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "Your FirebaseApi ",
    authDomain: "Yout AuthDomain",
    projectId: "Your Project-ID",
    storageBucket: "login-370d9.appspot.com",
    messagingSenderId: "Your messagingsendderID",
    appId: "Your APP ID",
    measurementId: "G-5GH62QD359"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log(" Firebase Initialized");

export { auth };





