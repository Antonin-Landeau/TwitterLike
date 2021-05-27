// import React from 'react'

// const Poste = (date, id, likes, nom , poste, prenom, uid) => {
//     return (
//         <div className="post" key={index}>
//         <h3>{post.prenom} {post.nom}</h3>
//         <p>{post.poste}</p>
//         <div className="footer__post">
//             <FavoriteBorderIcon onClick={() => {
//                 db.collection('postes').doc(post.id).get().then(doc => {
//                     let postLikes = doc.data().likes;
//                     if (!postLikes.includes(user.uid)) {
//                         db.collection('postes').doc(post.id).update({
//                             likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
//                         })
//                     }else {
//                         db.collection('postes').doc(post.id).update({
//                             likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
//                         })
//                     }
//                 })
                
//             }}></FavoriteBorderIcon>
//             <span className="like__conteur">{} </span>
//             <CommentIcon></CommentIcon>
//             {user.uid === post.uid ? <DeleteIcon onClick={()=>{
//                 db.collection("postes").doc(post.id).delete()
//             }}></DeleteIcon> :''}
//         </div>
//     </div>
//     )
// }

// export default Poste
