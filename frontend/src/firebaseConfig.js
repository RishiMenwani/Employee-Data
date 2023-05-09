

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeN5-XqAVLbcBZbjohuzORtcWHAHCbLmE",
  authDomain: "fir-25598.firebaseapp.com",
  projectId: "fir-25598",
  storageBucket: "fir-25598.appspot.com",
  messagingSenderId: "1030261476553",
  appId: "1:1030261476553:web:d8c3dbcd070c1694af5118",
  measurementId: "G-3TNR6GCEW6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const analytics = getAnalytics(app);

export default storage;
