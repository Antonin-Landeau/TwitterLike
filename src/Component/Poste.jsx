import React, {useEffect} from 'react'
import {db} from './../Firebase'
import firebase from 'firebase/app'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import './../Style/Poste.css'
const Poste = ({data, user}) => {
    return (
        <div className="post">
        <h3>{data.prenom} {data.nom}</h3>
        <p>{data.poste}</p>
        <div className="footer__post">
            <FavoriteBorderIcon className="like__post" onClick={() => {
                db.collection('postes').doc(data.id).get().then(doc => {
                    let postLikes = doc.data().likes;
                    if (!postLikes.includes(user.uid)) {
                        db.collection('postes').doc(data.id).update({
                            likes: firebase.firestore.FieldValue.arrayUnion(user.uid),
                            nblike: firebase.firestore.FieldValue.increment(1)
                        })
                    }else {
                        db.collection('postes').doc(data.id).update({
                            likes: firebase.firestore.FieldValue.arrayRemove(user.uid),
                            nblike: firebase.firestore.FieldValue.increment(-1)
                        })
                    }
                })
                
            }}></FavoriteBorderIcon>
            <span className="like__conteur">{data.nblike}</span>
            <CommentIcon className="comment__post"></CommentIcon>
            {data.uid === user.uid ? <DeleteIcon className="delete__post" onClick={()=>{
                db.collection("postes").doc(data.id).delete()
            }}></DeleteIcon> :''}
        </div>
    </div>
    )
}

export default Poste
