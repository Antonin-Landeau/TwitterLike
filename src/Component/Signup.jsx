import {React, useState} from 'react'
import { useHistory} from 'react-router-dom'

import "firebase/auth";

import {auth, db} from '../Firebase'

function Signup() {
    const [iemail, setiemail]= useState('');
    const [ipassword, setipassword]= useState('');
    const [nom, setNom]= useState('');
    const [prenom, setPrenom]= useState('');
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
                    prenom: prenom
                })
            })
    }







    return (
        <div>
            <h2>SignUp</h2>
            <div>
                <div>
                    <label>Nom </label>
                    <input value={nom} onChange={(e)=> {setNom(e.target.value)}} type="nom" name="nom"  />
                    <p className="error"></p>
                </div>
                <div>
                    <label>Prenom </label>
                    <input value={prenom} onChange={(e)=> {setPrenom(e.target.value)}} type="prenom" name="prenom"  />
                    <p className="error"></p>
                </div>
                <div>
                    <label>E-mail </label>
                    <input value={iemail} onChange={(e) => {setiemail(e.target.value)}} type="text" name="email"  />
                    <p className="error"></p>
                </div>  
                <div>
                    <label>Password </label>
                    <input value={ipassword} onChange={(e)=> {setipassword(e.target.value)}} type="password" name="password"  />
                    <p className="error"></p>
                </div>
                <button onClick={ ()=>{
                        createUser();
                        clearInput();
                        LogOut();
                        redirect();
                        
                    }}>SignUp</button>
            </div>            
        </div>
    )
}

export default Signup


