// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBLdRi87vu66lOQcKHxQyPMIDKBoqRfZ64",
  authDomain: "firstproject-29e57.firebaseapp.com",
  projectId: "firstproject-29e57",
  storageBucket: "firstproject-29e57.appspot.com",
  messagingSenderId: "885159264832",
  appId: "1:885159264832:web:3b0776d3e05fd09866d5a5",
  measurementId: "G-4LV6EFXBS6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const analytics = getAnalytics(app);
export default app
