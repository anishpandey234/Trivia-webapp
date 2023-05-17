import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { signOut } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5sgf9AHqr2ml8SmEDFt8SzzEgcs6sapM",
  authDomain: "quizproject-46fa2.firebaseapp.com",
  projectId: "quizproject-46fa2",
  storageBucket: "quizproject-46fa2.appspot.com",
  messagingSenderId: "845774217521",
  appId: "1:845774217521:web:24d244ca8c74582f969010",
  measurementId: "G-4CS4DGG3WL"
};


const initApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth =getAuth(initApp);

const provider = new GoogleAuthProvider()
export const signInWithGoogle = (onSignIn) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const uid = result.user.uid;
        const pfp = result.user.photoURL;
        localStorage.setItem("profilePic", pfp);
  
        // Check if user already exists in the database
        const userDoc = doc(db, "users", uid);
        const docSnap = await getDoc(userDoc);
  
        if (!docSnap.exists()) {
          // Add a new document in collection "users" with ID 'uid'
          await setDoc(doc(db, "users", uid), {
            profilePic: pfp,
            // other properties you want to save for this user
          });
        }
          
        // Call the onSignIn callback with the uid of the logged-in user
        if (onSignIn) {
          onSignIn(uid);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  export const signOutUser = async (onSignOut) => {
    try {
      await signOut(auth);
  
      // Call the onSignOut callback
      if (onSignOut) {
        onSignOut();
      }
    } catch (error) {
      console.log("Error signing out", error);
    }
  }