import React from 'react'

const Poste = (nom, prenom, post) => {
    return (
        <div>
            <h2>{nom} {prenom} </h2>
            <p>{post}</p>
            <button>Like</button>
        </div>
    )
}

export default Poste
