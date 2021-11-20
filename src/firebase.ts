import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "somerandomdrive.firebaseapp.com",
  projectId: "somerandomdrive",
  storageBucket: "somerandomdrive.appspot.com",
  messagingSenderId: "806218332702",
  appId: "1:806218332702:web:3bc540f9f078f23fbacc0f",
  measurementId: "G-MD1YQ2FEVH",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
