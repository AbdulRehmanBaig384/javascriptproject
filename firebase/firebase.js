import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6f62lKNpxmU1AtpDEpvU2fRBmmn28o2k",
    authDomain: "login-370d9.firebaseapp.com",
    projectId: "login-370d9",
    storageBucket: "login-370d9.appspot.com",
    messagingSenderId: "670301249239",
    appId: "1:670301249239:web:5440e2a722a056a59a9a92",
    measurementId: "G-5GH62QD359"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("🔥 Firebase Initialized");

export { auth };
