import React from 'react'
import './Card.css'

const Card = (props) => {
    return (
        <div className='card' style={{ overflow: "hidden" }}>
            <img src={props.url} alt="" style={{ width: "300px" }} />
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
    )
}

export default Card
