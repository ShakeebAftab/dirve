import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "somestoragedrive.firebaseapp.com",
  projectId: "somestoragedrive",
  storageBucket: "somestoragedrive.appspot.com",
  messagingSenderId: "661364420882",
  appId: "1:661364420882:web:e2dabcec1885b6daaf43cb",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storageBucket = firebase.storage();
