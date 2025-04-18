import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import './NewPost.css'

const NewPost = () => {
    const [post, setPost] = useState({
        title: '',
        author: '',
        description: '',
    });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
        .from('Posts')
        .insert({
            title: post.title,
            author: post.author,
            description: post.description,
        })
        .select();
        window.location = '/';
    };

    return (
        <div className = "newPost">
            <h2 className = 'newPostTitle'> Create a New Post! </h2>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post 🥅 </button></Link>
            </div>
            <h3> Fill in the form below to add a goal you like to the board! </h3>
            <div className = 'formDiv'>
                <form className = 'form' onSubmit={createPost}>
                    <input className = 'goal'
                        type = "text"
                        name = "title"
                        placeholder = "Goal"
                        value={post.title}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <input className = 'postAuthor'
                        type = "text"
                        name = "author"
                        placeholder = "Post Publisher"
                        value = {post.author}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <input className = 'desc'
                        name = "description"
                        placeholder = "Match & Date"
                        value = {post.description}
                        onChange = {handleChange}
                        required    // REQUIRED TO FILL OUT WHEN MAKING A NEW POST
                    />
                    <button className = 'submitPost' type= "submit"> Post! </button>
                </form>
            </div>
        </div>
    );
};

export default NewPost;