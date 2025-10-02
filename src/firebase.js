// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnqZyjHnCgzUPWfp5zJgJuzHPrK2BgJRo",
  authDomain: "todo-app-fb7eb.firebaseapp.com",
  projectId: "todo-app-fb7eb",
  storageBucket: "todo-app-fb7eb.firebasestorage.app",
  messagingSenderId: "949868408999",
  appId: "1:949868408999:web:902b8d31a0ae3190c1eb82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

