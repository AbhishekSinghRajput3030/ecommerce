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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

  export const addCollectionAndDocuments = async( collectionKey , objectsToAdd) => {
    const collectionRef=firestore.collection(collectionKey);
    
    const batch=firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef=collectionRef.doc();
      batch.set(newDocRef, obj);
    })

    return await batch.commit()
  };

export const convertCollectionsSnapshotToMap = collections=>{
  const transformedCollection =collections.docs.map(doc =>{
    const{title,items} = doc.data();

    return{
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  //console.log(transformedCollection)
  return transformedCollection.reduce((accumulator , collection) => {
    accumulator[collection.title.toLowerCase()]=collection;
    return accumulator;
  },{})
  };


//These things are for authentication
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;