import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './NewPost.css'

const NewPost = () => {
    const [post, setPost] = useState({
        post_title: '',
        post_content: '',
        postType: '',
        edit_key: '',
        media: '',
    });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
          .from('Posts')
          .insert({
            post_title: post.post_title,
            post_content: post.post_content,
            postType: post.postType,
            edit_key: post.edit_key,
            media: post.media,
          });
        window.location = '/';
      };

    return (
        <div className = "newPost">
            <h2 className = 'newPostTitle'> Create a New Post! </h2>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post ✨ </button></Link>
            </div>
            <h3> Fill in the form below to contribute to the discussion! </h3>
            <div className = 'formDiv'>
                <form className = 'form' onSubmit={createPost}>
                    <input className = 'postHeading'
                        type = "text"
                        name = "post_title"
                        placeholder = "Heading"
                        value={post.post_title}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <input className = 'desc'
                        name = "post_content"
                        placeholder = "Content"
                        value = {post.post_content}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <input className = 'media'
                        name = "media"
                        placeholder = "(Optional) Enter media URL"
                        value = {post.media}
                        onChange = {handleChange}
                    />
                    <h3 className = 'password'> 
                        Enter a secret key below to make sure only YOU can edit this post! 
                    </h3>

                    <input className = 'passwordBox'
                        name = "edit_key"
                        placeholder = "Passkey"
                        type = "password"
                        value = {post.edit_key}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <select className = "type" name = "postType" value = {post.postType} onChange = {handleChange} required>
                        <option value = ""> Select Post Type </option>
                        <option value = "Discussion"> Discussion </option>
                        <option value = "Build Ideas"> Build Ideas </option>
                        <option value = "Q/A"> Q/A </option>
                    </select>
                    <button className = 'submitPost' type= "submit"> Post! </button>
                </form>
            </div>
        </div>
    );
};

export default NewPost;