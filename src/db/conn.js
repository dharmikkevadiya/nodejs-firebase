// const firebaseAdmin = require("firebase-admin");
// const { BUCKET_URL } = require("../config");
// const serviceAccount = require("../../serviceAccountKey.json");

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   storageBucket: BUCKET_URL,
// });
// const db = firebaseAdmin.firestore();

// const User = db.collection("users");
// const Book = db.collection("books");

// module.exports = { User, Book, firebaseAdmin };

const { initializeApp, cert } = require("firebase-admin/app");
const { firestore } = require("firebase-admin");
const { BUCKET_URL } = require("../config");
const serviceAccount = require("../../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const db = firestore();

const User = db.collection("users");
const Book = db.collection("books");

module.exports = { User, Book };
