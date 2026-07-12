// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//connect react to firebase
import { initializeApp } from "firebase/app";
//enable auth  email..
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm-8Rzdgo29oC2jTiufvxNkBRBT0b_Cz4",
  authDomain: "eventhub-df392.firebaseapp.com",
  projectId: "eventhub-df392",
  storageBucket: "eventhub-df392.firebasestorage.app",
  messagingSenderId: "670864760931",
  appId: "1:670864760931:web:03938012721ad65fcc9856",
  measurementId: "G-Y3283CECVL"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);