// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

export { auth };
