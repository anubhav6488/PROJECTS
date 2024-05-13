
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCK8IneAc4AZBJ8wt_F_wVyd3Rq0Ce2cGM",
  authDomain: "project-13e3e.firebaseapp.com",
  projectId: "project-13e3e",
  storageBucket: "project-13e3e.appspot.com",
  messagingSenderId: "420835065044",
  appId: "1:420835065044:web:110426a315c5f06e51cf41",
  measurementId: "G-P83KHC75TD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;