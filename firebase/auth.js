import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 🔹 Signup Function
window.signUp = function () {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (email === "" || password === "") {
        alert(" Please fill all fields");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("✅ Successfully Signed Up!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert("❌ Signup Failed: " + error.message);
            console.error(error);
        });
};

// 🔹 Login Function
window.login = function () {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === "" || password === "") {
        alert("❌ Please fill all fields");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("✅ Successfully Logged In!");
            console.log("User:", userCredential.user);
        })
        .catch((error) => {
            alert("❌ Login Failed: " + error.message);
            console.error(error);
        });
};

