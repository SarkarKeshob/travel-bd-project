import {  createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import auth from "../../../Firebase/firebase.config";

export const UserAuthContext=createContext(null)
const UserContext = ({children}) => {
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    const signInUser=(email,password)=>{
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logInUser=(email,password)=>{
        setIsLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const forgetPassword=(email)=>{
        setIsLoading(true);
        return sendPasswordResetEmail(auth,email);
    }
    useEffect(()=>{
        const unsubScribe=onAuthStateChanged(auth,(user)=>{
            if(user?.emailVerified){
                setUser(user);
                setIsLoading(false);
            }
            else{
                setUser(null);
                setIsLoading(false);
            }
        })
        return()=>{
            unsubScribe();
        }
    },[])
    return (
        <div>
            <UserAuthContext.Provider value={{user,signInUser,logInUser,forgetPassword,isLoading}}>
                {children}
            </UserAuthContext.Provider>
        </div>
    );
};
UserContext.propTypes={
    children:PropTypes.node,
}
export default UserContext;