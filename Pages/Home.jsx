import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

import Card from '../Components/Card';
import './Home.css';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState('All');
    const [sortOption, setSortOption] = useState('Newest');

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
            .from('Posts')
            .select()
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

    const sortPosts = (postsToSort) => {
      switch (sortOption) {
        case 'Oldest':
          return [...postsToSort].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        case 'Newest':
          return [...postsToSort].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        case 'MostLikes':
          return [...postsToSort].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        case 'Alphabetical':
          return [...postsToSort].sort((a, b) => a.post_title.localeCompare(b.post_title));
        default:
          return postsToSort;
      }
    };
  
    const filteredAndSortedPosts = sortPosts(
      posts.filter((post) => filter === 'All' || post.postType === filter)
    );
    

    return (
        <div className="header">
            <h1 className = "pageTitle"> The Hangout!⛏️ </h1>
            <h3>
                As a community, we can combine ideas and come up with some super cool ideas to build in our Minecraft Server!
                <br/>
                Here, one can communicate with other members or even share thoughts on what YOU think would be a good addition to the server!
              </h3>
            <div className = 'navButtons'>
                <Link to = "/"> <button> View Posts 🔍 </button></Link>
                <Link to = "/createPost"> <button> Create Post ✨ </button></Link>
                <select className = "filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value = "All"> No Filter </option>
                    <option value = "Discussion"> Discussion </option>
                    <option value = "Build Ideas"> Build Ideas </option>
                    <option value = "Q/A"> Q/A </option>
                </select>

                <select className = "sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value = "Newest"> Newest First </option>
                    <option value = "Oldest"> Oldest First </option>
                    <option value = "MostLikes"> Most Likes </option>
                    <option value = "Alphabetical"> Alphabetical Order </option>
                </select>
            </div>
            <div className="ReadPosts">
                {filteredAndSortedPosts.length > 0 ? (
                filteredAndSortedPosts.map((post) => (
                    <Card key={post.id} id={post.id} post_title={post.post_title} post_content={post.post_content} likes={post.likes} dislikes={post.dislikes} commentNum={post.commentNum} postType={post.postType} media = {post.media} created_at={post.created_at}/>
                ))
                ) : (
                <h2 className = "noPosts"> No Posts Yet 😞</h2>
                )}
            </div>
        </div>
    );
};

export default Home;
