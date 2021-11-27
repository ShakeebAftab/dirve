import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "somerandomcloud.firebaseapp.com",
  projectId: "somerandomcloud",
  storageBucket: "somerandomcloud.appspot.com",
  messagingSenderId: "1047325761331",
  appId: "1:1047325761331:web:e725d36123730e47872846",
  measurementId: "G-R2C4MYSLE8",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storageBucket = firebase.storage();
