import React, { useState} from 'react'

import firebase from "firebase/app";
import "firebase/auth";
import { gsap } from "gsap";


import {db} from '../Firebase';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom';
import './../Style/Signin.css';



function Signin() {
    const [email, setiemail]= useState('');
    const [password, setipassword]= useState('');
    const [error, setError] = useState('')
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
    const animationInputonFocus = (classNameLabel, classNameInput) => {
        gsap.to("."+classNameLabel, {
            color: "lightgreen",
            transformOrigin:"left top",
            yPercent:-100,
            scale: 0.8,
            duration:0.2,
            ease:"power2.out"
        })
        gsap.to("."+classNameInput, {
            borderColor: "lightgreen",
            duration:0.2,
            ease:"power2.out"
        })
    }

    const animationInputonFocusOut = (classNameLabel, classNameInput) => {
        gsap.to("."+ classNameLabel, {
            color: "black",
            yPercent:0,
            scale: 1,
            duration:0.2,
            ease:"power2.out"
        })
        gsap.to("."+classNameInput, {
            borderColor: "grey",
            duration:0.2,
            ease:"power2.out"
        })
    }


    return (
        <div className="SignIn">
            <h2>Connexion</h2>
            <div className="SignIn_Form">
                <div className="Input">
                    <label className="emailLabel">E-mail </label>
                    <input className="emailInput" onFocus={() => animationInputonFocus("emailLabel","emailInput")} onBlur={(e) => {
                        if(!e.target.value){
                            animationInputonFocusOut("emailLabel","emailInput");
                        }
                        }} autoComplete="off" value={email} onChange={(e) => {setiemail(e.target.value)}} type="text" name="email"  />
                </div>  
                <div className="Input">
                    <label className="mdpLabel">Password </label>
                    <input className="mdpInput" onFocus={() => animationInputonFocus("mdpLabel","mdpInput")} onBlur={(e) => {
                        if (!e.target.value){

                            animationInputonFocusOut("mdpLabel", "mdpInput")
                        }
                        }} autoComplete="off" value={password} onChange={(e)=> {setipassword(e.target.value)}} type="password" name="password"  />
                </div>
                <p className="errorMessage">{error}</p>
                <button className="signInBtn" onClick={() => {
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
                        setError(errorMessage)
                        console.log(errorCode, errorMessage);
                    });
                        
                    }}>Connexion</button>
                    <p>Toujours pas inscrits ? <Link to="./SignUp">Inscrivez-vous</Link></p>
            </div>  
        </div>
    )
}

export default Signin
