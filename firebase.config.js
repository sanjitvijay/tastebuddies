// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB86PJ4PbFw-oZYbCOcy9U0brKVezutGzU",
  authDomain: "tastebuddies-dd1c6.firebaseapp.com",
  projectId: "tastebuddies-dd1c6",
  storageBucket: "tastebuddies-dd1c6.appspot.com",
  messagingSenderId: "38520260870",
  appId: "1:38520260870:web:9b01ad06689d520d50b687"
};

// Initialize Firebase
export const db = getFirestore()