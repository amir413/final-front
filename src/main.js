import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoyrXGnRIRc1yoNLN2khd4eGjoURNCUco",
    authDomain: "login-e1229.firebaseapp.com",
    projectId: "login-e1229",
    storageBucket: "login-e1229.appspot.com",
    messagingSenderId: "175908049876",
    appId: "1:175908049876:web:56983ebeddcd9c32cdfc41",
    measurementId: "G-S02Q67DYJV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

const googleLoginBtn = document.getElementById("google-login-btn");
googleLoginBtn.addEventListener("click", async function() {
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        console.log(user); // Log user info to console
        window.location.href = "./logged.html"; // Redirect to logged.html after successful login
    } catch (error) {
        console.error("Error during sign-in:", error.code, error.message);
        // Optionally, display an error message to the user
    }
});
