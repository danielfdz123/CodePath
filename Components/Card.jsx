import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';

import './Card.css';

const Card = (props) => {
  const [likeCount, setLikes] = useState(props.likes || 0);
  const [dislikeCount, setDislikes] = useState(props.dislikes || 0);
  const [commentCount, setCommentCount] = useState(props.count || 0); // start from 0 and fetch it later

  useEffect(() => {
    const fetchCommentCount = async () => {
      const { count, error } = await supabase
        .from('Comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', props.id);
  
      if (error) {
        console.error('Error fetching comment count:', error.message);
      } else {
        setCommentCount(count);
      }
    };
  
    fetchCommentCount();
  }, [props.id]);

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="Card">
      <div className='top'>
        <div className='left'>
          <span className={props.postType ? props.postType.toLowerCase().replace(' ', '-').replace('/', '-') : ''}>
            {props.postType || "Type?"}
          </span>
        </div>
        <div className='right'>
          <Link to={'/editPost/' + props.id}>
            <button> Edit </button>
          </Link>
        </div>
      </div>

      <h2 className="title">
        <Link to={`/post/${props.id}`} className="post-link">
          {props.post_title}
        </Link>
      </h2>
      
      <div className='postStats'>
        <button> 👍: {likeCount} </button>
        <button> 👎: {dislikeCount} </button>
        <button> 💬: {commentCount} </button>
      </div>

      <small> Posted {formatRelativeTime(props.created_at)}</small>
    </div>
  );
};

export default Card;
