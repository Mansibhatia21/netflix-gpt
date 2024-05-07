// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-_URx39WxQrbbjr4wthB-_J_08NluFPw",
  authDomain: "netflixgpt-a2131.firebaseapp.com",
  projectId: "netflixgpt-a2131",
  storageBucket: "netflixgpt-a2131.appspot.com",
  messagingSenderId: "689015545635",
  appId: "1:689015545635:web:41241b65503de2b780b696",
  measurementId: "G-3FEMGBKTSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
