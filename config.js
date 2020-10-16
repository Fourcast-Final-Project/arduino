// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// var firebase = require("firebase/app");
var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyCKJBEtmZAU1B3sEWJ9FdT0ks8Q3uIJX9o",
  authDomain: "fourcast-pizza.firebaseapp.com",
  databaseURL: "https://fourcast-pizza.firebaseio.com",
  projectId: "fourcast-pizza",
  storageBucket: "fourcast-pizza.appspot.com",
  messagingSenderId: "694146073936",
  appId: "1:694146073936:web:38d554e39ee1203d449855"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;