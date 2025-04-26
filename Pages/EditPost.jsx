import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
      post_title: '',
      post_content: '',
      postType: '',
      media: '',
      edit_key: ''
    });
    const [storedKey, setStoredKey] = useState('');
    const [enteredKey, setEnteredKey] = useState('');
  
    useEffect(() => {
      const fetchPost = async () => {
        const { data } = await supabase
          .from('Posts')
          .select('post_title, post_content, postType, media, edit_key')
          .eq('id', id)
          .single();
        if (data) {
          setPost(data);
          setStoredKey(data.edit_key);
        }
      };
      fetchPost();
    }, [id]);
  
    const handleChange = (e) => {
      setPost({
        ...post,
        [e.target.name]: e.target.value
      });
    };
  
    const updatePost = async () => {
      if (enteredKey !== storedKey) {
        alert('Incorrect edit key. Post not updated.');
        return;
      }
  
      const updatedPost = { ...post };
      delete updatedPost.edit_key; // Don't update the key itself
      await supabase
        .from('Posts')
        .update(updatedPost)
        .eq('id', id);
  
      alert('Post updated successfully!');
      navigate('/');
    };
  
    const deletePost = async () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (!confirmDelete) return;
  
      if (enteredKey !== storedKey) {
        alert('Proper edit key was not entered. Post not deleted.');
        return;
      }
  
      await supabase
        .from('Posts')
        .delete()
        .eq('id', id);
  
      alert('Post deleted!');
      navigate('/');
    };

    return (
        <div className = "editPost">
            <h2 className = 'editPostTitle'> Update Your Post! </h2>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post ✨ </button></Link>
            </div>
            <h3> See the form below to see what you currently have, and feel free to make any changes form there! </h3>
            <div className = 'formDiv'>
                <form className = 'form' onSubmit={(e) => { e.preventDefault(); updatePost(); }}>
                    <input className = 'postHeading'
                        name = "post_title"
                        value = {post.post_title}
                        onChange={handleChange}
                        placeholder = {post.post_title}
                    />
                    <input className = 'desc'
                        name = "post_content"
                        value={post.post_content}
                        onChange = {handleChange}
                        placeholder = {post.post_content}
                    />
                    <input className = 'media'
                        name = "media"
                        value = {post.media}
                        onChange = {handleChange}
                        placeholder = "Enter image/media URL (leave blank if none)"
                    /> 
                    <h3> Enter passkey to succesfully edit this post! </h3>
                    <input className = 'editKey' 
                        name = "edit_key"
                        type = "password"
                        placeholder = 'Enter edit key...'
                        value = {enteredKey}
                        onChange={(e) => setEnteredKey(e.target.value)}
                        required
                    />
                    <select className = 'type' name = "postType" value = {post.postType} onChange={handleChange} required>
                        <option value =""> Select Post Type </option>
                        <option value = "Discussion"> Discussion </option>
                        <option value = "Build Ideas"> Build Ideas </option>
                        <option value = "Q/A"> Q/A </option>
                    </select>
                    <div className = 'buttonDiv'>
                        <button className = 'submitPost' type="submit"> Save Changes </button>
                        <button className = 'deletePost' onClick={deletePost}>Delete Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;
