// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPF-pJO1-PYD4ejZaOj9awkIqmnoXvHzA",
  authDomain: "will-be-there-421812.firebaseapp.com",
  projectId: "will-be-there-421812",
  storageBucket: "will-be-there-421812.appspot.com",
  messagingSenderId: "868975978411",
  appId: "1:868975978411:web:94472a4db64d434d1714ee",
  measurementId: "G-SGL4XPX8P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };