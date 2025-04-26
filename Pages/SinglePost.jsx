import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import { formatDistanceToNow } from 'date-fns';
import './SinglePost.css';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const { data: postData, error: postError } = await supabase
        .from('Posts')
        .select('*')
        .eq('id', id)
        .single();
        setPost(postData);
        setLikeCount(postData.likes || 0);
        setDislikeCount(postData.dislikes || 0);
      
      const { data: commentsData, error: commentsError } = await supabase
        .from('Comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
        setComments(commentsData);
    };
    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (comment.trim() === '') return;

    const { data: commentData, error: commentError } = await supabase
      .from('Comments')
      .insert([
        {
          post_id: id,
          comment: comment,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (commentError) {
      console.error('Error posting comment:', commentError);
      return;
    }

    if (commentData && commentData.length > 0) {
      await supabase
        .from('Posts')
        .update({ commentNum: post.commentNum + 1 })
        .eq('id', id);
        setComments([...comments, commentData[0]]);
        setComment('');
        setCommentCount(commentCount + 1); 
      
    } else {
      console.error('No comment data returned after insert.');
    }
  };

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const updateLikes = async () => {
    await supabase
      .from('Posts')
      .update({ likes: likeCount + 1 })
      .eq('id', id);
      setLikeCount(likeCount + 1);
  };

  const updateDislikes = async () => {
    await supabase
      .from('Posts')
      .update({ dislikes: dislikeCount + 1 })
      .eq('id', id);
      setDislikeCount(dislikeCount + 1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }


  return (
    <div className = "singlePostContainer">
      <div className = "navButton">
        <Link to = "/"><button>View Posts 🔍</button></Link>
        <Link to = "/createPost"><button>Create Post ✨ </button></Link>
      </div>
      <div className = "postDiv">
        <p className = "timesection"> Posted {formatRelativeTime(post.created_at)} </p>
        <h2 className = "postTitle"> {post.post_title}</h2>
        <p className = "postContent"> {post.post_content} </p>
        {post.media && (
          <div className = "postMedia">
            <img src={post.media} alt="Post Media" />
          </div>
        )}
        <div className = 'postStats'>
          <button onClick = {updateLikes}> 👍: {likeCount} </button>
          <button onClick = {updateDislikes}> 👎: {dislikeCount} </button>
          <button> 💬: {commentCount} </button>
        </div>
        <div className = "addComments">
          

          <div className = "commentsSection">
            <h3> Comments: </h3>
            <ul>
                {comments.map((c) => (
                <li key={c.id}>
                  <p> {c.comment} </p>
                </li>
                ))}
              </ul>
            </div>
                <input className = "commentBox"
                    name="comment" 
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            <button className = 'sendComment' onClick={handleCommentSubmit}> Submit Comment </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;