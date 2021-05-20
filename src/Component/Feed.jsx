import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {auth, db} from './../Firebase'

function Feed() {
    const [state, setstate] = useState(false)
    const [user, setUser] = useState({})
    const [postValue, setPostValue] = useState('')
    const [posts, setPosts] = useState([])

    const getUserData = (uid) => {
        var docRef = db.collection("users").doc(uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                setUser(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    const createPost = (prenom, nom, poste) => {
        let date = new Date();
        if (prenom && nom && poste ) {
            db.collection("postes").add({
                prenom: prenom,
                nom: nom,
                poste: poste,
                date: date
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        }

    }

    const clearInput = () => {
        setPostValue('')
    }

    useEffect(() => {
        auth.onAuthStateChanged(function(user) {
            if (user) {
                let uid = user.uid;
                getUserData(uid);
                setstate(true)
            }else {
                setstate(false)

            }
        })
        db.collection("postes").orderBy('date', 'desc').onSnapshot(snapshot => setPosts(snapshot.docs.map(doc=> doc.data())))
    }, [])
    
    if(state === true){
        return (
            <div>
                <div>
                <h2>Bienvenue sur le Feed {user.nom} {user.prenom}</h2>
                <input value={postValue} type="text" onChange={e => setPostValue(e.target.value)}/>
                <button onClick={() => {
                    createPost(user.prenom, user.nom, postValue)
                    clearInput();
                }}>Poster</button>
                </div>
                <div>
                    {posts.map((post,index) => {
                        return(
                            <div key={index}>
                                <h3>{post.prenom} {post.nom}</h3>
                                <p>{post.poste}</p>
                            </div>
                        )
                        
                    })}
                </div>
            </div>

        )
    }else if (state === false){
        return (
            <div>
                <p>Vous devez vous connectez</p>
                <Link to="/SignIn">Se connecter</Link>
            </div>
        )
    }


}

export default Feed
