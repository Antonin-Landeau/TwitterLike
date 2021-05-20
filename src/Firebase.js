import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBKODocjd4oamJB6fkA5T53KR7a3yVIDBU",
    authDomain: "fir-2f245.firebaseapp.com",
    projectId: "fir-2f245",
    storageBucket: "fir-2f245.appspot.com",
    messagingSenderId: "813781184059",
    appId: "1:813781184059:web:964ce63f29a2d4477c761e",
    measurementId: "G-7HF2BHL2E5"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();


// export default auth;
