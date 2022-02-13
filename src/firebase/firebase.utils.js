import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCajfyQYoce--Y1NphWxK9G8WaYRtWIils",
    authDomain: "ecommerce-16679.firebaseapp.com",
    projectId: "ecommerce-16679",
    storageBucket: "ecommerce-16679.appspot.com",
    messagingSenderId: "626272411073",
    appId: "1:626272411073:web:eedc8574a7e5113582e340"
};

firebase.initializeApp(config);

//These things are for authentication
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;