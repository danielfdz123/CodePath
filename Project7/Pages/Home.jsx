import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import Card from '../Components/Card';
import './Home.css';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false });
            if (error || !data || data.length === 0) 
            {
                setPosts(props.test || []);
            } 
            else
            {
                setPosts(data);
            }
        };
        fetchPost();
    }, []);
    

    return (
        <div className="header">
            <h1 className = "pageTitle"> ⚽ Best Soccer Goals! ⚽ </h1>
            <h3>
                As a community, we can put posts about what we think are the best goals made by our beloved players!
                <br/>
                Share your thoughts by posting what YOU think was a beautiful goal!
            </h3>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post 🥅 </button></Link>
                <select className = "filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value = "All"> No Filter </option>
                    <option value = "Skill"> Skill Goals </option>
                    <option value = "Creativity"> Creative Goals </option>
                    <option value = "Clutch"> Clutch Goals </option>
                </select>
            </div>

            <div className = "ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.filter((post) => filter === 'All' || post.goalType === filter)
                .map((post) => 
                    <Card key = {post.id} id = {post.id} title = {post.title} author = {post.author} description = {post.description} likes = {post.likes} dislikes = {post.dislikes} goalType = {post.goalType}/>
                  )
                   : <h2 className = 'noPosts'> No Posts Yet 😞 </h2>
            }
        </div>  
        </div>
    );
};

export default Home;
