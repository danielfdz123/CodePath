import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

import './EditPosts.css';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        author: '',
        description: ''
    });

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
            .from('Posts')
            .select('title, author, description')
            .eq('id', id)
            .single();
            if (data) {
                setPost(data);
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
        await supabase
        .from('Posts')
        .update({
            title: post.title,
            author: post.author,
            description: post.description
        })
        .eq('id', id);
        navigate('/');
    };

    const deletePost = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
          await supabase
            .from('Posts')
            .delete()
            .eq('id', id);
          alert('Post deleted!');
          navigate('/');
        }
      };

    return (
        <div className = "editPost">
            <h2 className = 'editPostTitle'> Update Your Post! </h2>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post 🥅 </button></Link>
            </div>
            <h3> See the form below to see what you currently have, and feel free to make any changes form there! </h3>
            <div className = 'formDiv'>
                <form className = 'form' onSubmit={(e) => { e.preventDefault(); updatePost(); }}>
                    <input className = 'goal'
                        name = "title"
                        onChange={handleChange}
                        placeholder = {post.title}
                    />
                    <input className = 'postAuthor' 
                        name = "author"
                        onChange = {handleChange}
                        placeholder = {post.author}
                    />
                    <input className = 'desc'
                        name="description"
                        onChange = {handleChange}
                        placeholder = {post.description || 'Add Match & Date (Optional)' }
                    />
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
