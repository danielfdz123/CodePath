import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client';

import './Card.css'

const Card = (props) =>  {

  const [likeCount, setLikes] = useState(props.likes || 0 )
  const [dislikeCount, setDislikes] = useState(props.dislikes || 0)

  const updateLikes = async () => {
      await supabase
      .from('Posts')
      .update({ likes: likeCount + 1 })
      .eq('id', props.id);
      setLikes((count) => count + 1);
    
  };

  const updateDislikes = async () => {
      await supabase
      .from('Posts')
      .update({ dislikes: dislikeCount + 1 })
      .eq('id', props.id);
      setDislikes((count) => count + 1);
  };

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