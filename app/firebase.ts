// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFb-ZZDKZDU5O3Jt0ELuRABvYESO1Yk5g",
  authDomain: "summer-fes.firebaseapp.com",
  projectId: "summer-fes",
  storageBucket: "summer-fes.appspot.com",
  messagingSenderId: "949189959835",
  appId: "1:949189959835:web:793c5805363775b6e1a63e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
