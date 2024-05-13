const { getAuth, signInWithPopup, GoogleAuthProvider } = require('firebase/auth');
const { initializeApp } = require('firebase/app');
// const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');
const { OAuth2Client } = require('google-auth-library');
const admin = require('firebase-admin');
// const {
//     collection,
//     doc,
//     setDoc,
//     query,
//     addDoc,
//     getDocs,
//     getDoc,
//     where,
//     collectionGroup,
//     startAt,
//     orderBy,
//     endAt,
//     limit,
//     startAfter,
//     documentId,
//     updateDoc,
//     serverTimestamp,
//   } = require("firebase/firestore");
  const { getStorage, ref, getDownloadURL } = require("firebase/storage");
  // const googleProvider = new admin.auth.GoogleAuthProvider();

  const fireDB = require("../connections/firebase");
  
  const async = require("async");
  const Constant = require("../lib/constants");

  const Admin = require("mongodb/lib/admin");
  const { all } = require("axios");
  var inis=require("../connections/ini")
 
const serviceAccount = require('../connections/googleauth.json');

const auth = getAuth();

async function signInWithGoogle(idToken) {
  try {
    console.log(idToken)
    const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: "113183681975582566768", // Replace with your Google client ID
  });
  const payload = ticket.getPayload();
  return payload;
}
catch (error) {
  console.error('Google authentication error:', error);
}
};

module.exports = { signInWithGoogle };
