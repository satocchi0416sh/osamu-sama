import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyB25uOws5f6S6CUWpTOnHHYwdRzTN28zY4",
    authDomain: "image-60283.firebaseapp.com",
    projectId: "image-60283",
    storageBucket: "image-60283.appspot.com",
    messagingSenderId: "285870147300",
    appId: "1:285870147300:web:af0e52f46c4eac73e98ef1",
    measurementId: "G-S5XZVNHYTY"
};

firebase.initializeApp(firebaseConfig);
const storage= firebase.storage()

export {storage,firebase as default};