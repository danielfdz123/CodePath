import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from '../Pages/Home';
import NewPost from '../Pages/NewPost';
import EditPosts from '../Pages/EditPost';
import SinglePost from '../Pages/SinglePost';

const App = () => {
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>} />
          <Route path = "/createPost" element = {<NewPost/>} />
          <Route path = "/editPost/:id" element = {<EditPosts />} />
          <Route path = "/post/:id" element = {<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
