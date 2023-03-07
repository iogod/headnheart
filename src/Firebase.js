import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGuLipRjTjE_uDQVMn1-AmF16UkioDs8I",
  authDomain: "hnh-chuki.firebaseapp.com",
  projectId: "hnh-chuki",
  storageBucket: "hnh-chuki.appspot.com",
  messagingSenderId: "560716043631",
  appId: "1:560716043631:web:e5a1025425fc76b556449a",
  measurementId: "G-H9V7WB0022",
};
export const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);
