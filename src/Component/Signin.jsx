import React, { useState} from 'react'

import firebase from "firebase/app";
import "firebase/auth";

import {db} from '../Firebase'
import { useHistory } from 'react-router';
import './../Style/Signin.css'



function Signin() {
    const [email, setiemail]= useState('');
    const [password, setipassword]= useState('');
    let history = useHistory();

    const clearInput = () => {
        setiemail('')
        setipassword('')
    }

    const getUserData = (uid) => {
        var docRef = db.collection("users").doc(uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    
    const redirect = () => {
        history.push('/Feed')
    }

    return (
        <div className="SignIn">
            <h2>Sign In</h2>
            <div className="SignIn_Form">
                <div className="Input">
                    <label>E-mail </label>
                    <input autoComplete="off" value={email} onChange={(e) => {setiemail(e.target.value)}} type="text" name="email"  />
                    <p className="error"></p>
                </div>  
                <div className="Input">
                    <label>Password </label>
                    <input autoComplete="off" value={password} onChange={(e)=> {setipassword(e.target.value)}} type="password" name="password"  />
                    <p className="error"></p>
                </div>
                <button onClick={() => {
                    clearInput();
                    firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                      // Signed in
                      var user = userCredential.user;
                      var uid = user.uid
                      console.log(user.uid);
                      getUserData(uid)
                      redirect();

                      // ...
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      console.log(errorCode, errorMessage);
                    });
                        
                    }}>Sign In</button>
            </div>  
        </div>
    )
}

export default Signin
