import React from 'react'
import { useState } from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [likeCount, setLikes] = useState(0)
  const [dislikeCount, setDislikes] = useState(0)

  const updateLikes = () => {
    setLikes((count) => count + 1);
  }

  const updateDislikes = () => {
    setDislikes((count) => count + 1);
  }

  return (
      <div className = "Card">
        <div className = 'editButton'>
          <Link to={'editPost/'+ props.id}> 
            <button> Edit </button>
          </Link>
        </div>
          <h2 className = "title">{props.title} </h2>
          <h4 className = "author"> {"by " + props.author} </h4>
          <p className = "description">{props.description} </p>
          <div className = 'likeButtons'>
            <button onClick = {updateLikes}> Likes 👍: {likeCount} </button>
            <button onClick = {updateDislikes}> Dislikes 👎: {dislikeCount} </button>
          </div>
      </div>
  );
};

export default Card;