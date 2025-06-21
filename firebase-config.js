// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth
export const auth = getAuth(app);

// Init Service
const db = getFirestore();
export { db };

//colletion ref
const colRef = collection(db, "AR_Objects");

//get coll data
getDocs(colRef);

////adding doc
// const addARObjectForm = document.querySelector(".add-obj");

// addARObjectForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const user = auth.currentUser;
//   if (!user) {
//     console.error("User not authenticated");
//     return;
//   }

//   const formData = new FormData(addARObjectForm);
//   const name = formData.get("name");
//   const longitude = formData.get("longitude");
//   const latitude = formData.get("latitude");
//   const file = formData.get("file-upload");

//   const storageRef = ref(storage, `arObjects/${file.name}`);
//   try {
//     await uploadBytes(storageRef, file);
//     const fileUrl = await getDownloadURL(storageRef);

//     const docRef = await addDoc(collection(db, "arObjects"), {
//       userId: user.uid,
//       userName: user.displayName,
//       userEmail: user.email,
//       name: name,
//       longitude: longitude,
//       latitude: latitude,
//       fileUrl: fileUrl,
//     });
//     console.log("Document added with ID: ", docRef.id);
//     addARObjectForm.reset(); // Reset the form after successful submission
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// });
