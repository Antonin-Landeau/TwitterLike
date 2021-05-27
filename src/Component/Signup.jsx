import {React, useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import './../Style/Signin.css'
import "firebase/auth";
import {gsap} from 'gsap'

import {auth, db} from '../Firebase'

function Signup() {
    const [iemail, setiemail]= useState('');
    const [ipassword, setipassword]= useState('');
    const [nom, setNom]= useState('');
    const [prenom, setPrenom]= useState('');
    const [error, setErrore]= useState('');
    let history = useHistory();
    
    
    function clearInput(){
        setiemail('');
        setipassword('');
        setNom('');
        setPrenom('');
    }


    const redirect = () => {
      history.push('/SignIn')
    }

    const LogOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            console.log('disconnected');
          }).catch((error) => {
            // An error happened.
          });
    } 


    function createUser() {
        let email = iemail;
        let password = ipassword;
        auth.createUserWithEmailAndPassword(email, password).then(
            cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    email: email,
                    nom: nom,
                    prenom: prenom,
                    uid: cred.user.uid
                })
                redirect();
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setErrore(errorMessage)
                console.log(errorCode, errorMessage);
            });
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
            <h2>SignUp</h2>
            <div className="SignIn_Form">
                <div className="Input">
                    <label className="nomLabel">Nom </label>
                    <input autoComplete="off" onFocus={() => {animationInputonFocus("nomLabel","nomInput")}} onBlur={(e)=>{
                        if (!e.target.value){
                            animationInputonFocusOut("nomLabel","nomInput")
                        }
                        }} className="nomInput" value={nom} onChange={(e)=> {setNom(e.target.value)}} type="nom" name="nom"  />
                </div>
                <div className="Input">
                    <label className="prenomLabel">Prenom </label>
                    <input autoComplete="off" onFocus={() => {animationInputonFocus("prenomLabel","prenomInput")}} onBlur={(e)=>{
                        if (!e.target.value){
                            animationInputonFocusOut("prenomLabel","prenomInput")
                        }
                        }} className="prenomInput" value={prenom} onChange={(e)=> {setPrenom(e.target.value)}} type="prenom" name="prenom"  />
                </div>
                <div className="Input">
                    <label className="emailLabel">E-mail </label>
                    <input autoComplete="off" onFocus={() => {animationInputonFocus("emailLabel","emailInput")}} onBlur={(e)=>{
                        if (!e.target.value){
                            animationInputonFocusOut("emailLabel","emailInput")
                        }
                        }} className="emailInput" value={iemail} onChange={(e) => {setiemail(e.target.value)}} type="text" name="email"  />
                </div>  
                <div className="Input">
                    <label className="mdpLabel">Password </label>
                    <input autoComplete="off" onFocus={() => {animationInputonFocus("mdpLabel","mdpInput")}} onBlur={(e)=>{
                        if (!e.target.value){
                            animationInputonFocusOut("mdpLabel","mdpInput")
                        }
                        }} className="mdpInput" value={ipassword} onChange={(e)=> {setipassword(e.target.value)}} type="password" name="password"  />
                </div>
                <button className="signInBtn" onClick={()=>{
                        createUser();
                        clearInput();
                        LogOut();                        
                }}>SignUp</button>
                <p className="errorMessage">{error}</p>
                <p>Vous possédez déjà un compte ? <Link to="/Signin"> Se connecter</Link></p>
            </div>            
        </div>
    )
}

export default Signup


