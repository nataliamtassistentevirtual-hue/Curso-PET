
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl6PzasxdAlfYDNdEJKKc2d0pZ66y4paU",
  authDomain: "curso-pet.firebaseapp.com",
  projectId: "curso-pet",
  storageBucket: "curso-pet.firebasestorage.app",
  messagingSenderId: "417248514699",
  appId: "1:417248514699:web:1c16ca1b424a05e9d2fa8e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
