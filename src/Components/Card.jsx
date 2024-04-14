// import React from 'react'
// import dp from '../Images/github.png'
import './CSS/Card.css'

const Card = ({username,dp}) => {
    return (
        <div className='card'>
            <img src={dp} alt="" style={{ width: '70px', height: '70px', borderRadius: '50%', border:'2px solid gray'}} />
            <p>{username}</p>
        </div>
    )
}

export default Card