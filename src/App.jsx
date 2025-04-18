import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Home from '../Pages/Home';
import NewPost from '../Pages/NewPost';
// import EditPosts from '../Pages/EditPosts';


// TEST CASES TO SEE IF WE CAN GET SOMETHING RUNNING FOR NOW
const demo = [
  {
    id: 1,
    title: "Zlatan's Overhead Kick",
    author: "GoalLover21",
    description: "That goal from 40 yards out... absolute magic!"
  },
  {
    id: 2,
    title: "Declan Rice Free Kick",
    author: "Steve",
    description: "Was perfect!"
  },
  {
    id: 3,
    title: "Messi",
    author: "Steve",
    description: "Was perfect!"
  },
  {
    id: 4,
    title: "Ronaldo Bicycle Kick",
    author: "Steve",
    description: "Was perfect!"
  },
  {
    id: 5,
    title: "Ronaldo Bicycle Kick",
    author: "Steve",
    description: "Was perfect!"
  }
];

const App = () => {
  return (
    <div className = "App">
      <BrowserRouter>
        <Routes>
          {/* <Route path = "/" element={<Home test={demo} />} /> */}
          <Route path = "/" element={<Home/>} />
          <Route path = "/createPost" element = {<NewPost/>} />
          {/* <Route path="/editPost/:id" element={<EditPosts />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
