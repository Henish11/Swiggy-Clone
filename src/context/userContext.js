import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../firebase'

const userAuthContext = createContext()

export const UserAuthContextProvider = ({children}) =>{
    
    const [user,setUser] = useState('')

    // Register
    const signUp = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // Login
    const login = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    // Login With Google
    const googleSignIn = () =>{
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth,googleProvider)

    }
    // Logout
    const logOut = ()=>{
        return signOut(auth)
    }
    // Save User Data in State
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentuser)=>{
            setUser(currentuser)
        })
        return(()=>{
            unsubscribe()
        })
    },[])

   return (
      <userAuthContext.Provider value={{signUp,login,user,googleSignIn,logOut}}>
          {children}
      </userAuthContext.Provider>
   )
}

export const useUserAuth = () =>{
    return useContext(userAuthContext)
}




