import React, { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

const googleAuthProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
  }

  const updateUser = (username)=>{
    setLoading(true)
    return updateProfile(auth.currentUser,{displayName:username})
  }

  const signInUser = (email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  
  const signOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      if (currentUser?.email) {
        const user ={email:currentUser.email}
        axios.post("https://job-portal-server-ten-kappa.vercel.app/jwt",user,{withCredentials:true})
        .then(res=>{
          // console.log(res.data)
          setLoading(false)
        })
      }else{
        axios.post("https://job-portal-server-ten-kappa.vercel.app/logout",{},{
          withCredentials:true
        })
        .then(res=>{
          // console.log(res.data)
          setLoading(false)
        })
      }
      
      
    })
    return ()=>{
      unSubscribe()
    }
  },[])

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    createUser,
    updateUser,
    signInUser,
    signOutUser,
    signInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
