import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'


//Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyA9UvjXAIuD7W3SfrqiITc0UrLmxoR6BoE",
    authDomain: "first-project-1817b.firebaseapp.com",
    projectId: "first-project-1817b",
    storageBucket: "first-project-1817b.appspot.com",
    messagingSenderId: "998979237931",
    appId: "1:998979237931:web:048f4ba9fbaa87f9a7126e",
    measurementId: "G-QY014HVM2X"
};
  
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)

export default firebaseApp