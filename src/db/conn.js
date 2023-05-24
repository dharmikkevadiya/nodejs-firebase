const firebaseAdmin = require("firebase-admin");
const { BUCKET_URL } = require("../config");
const serviceAccount = require("../../nodejs-firebase-crud-54fea-firebase-adminsdk-fugee-54359e47bb.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});
const db = firebaseAdmin.firestore();

const User = db.collection("users");
const Book = db.collection("books");

module.exports = { User, Book, firebaseAdmin };
