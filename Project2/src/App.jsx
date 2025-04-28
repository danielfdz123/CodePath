import './App.css';
import React, { useState, useEffect } from 'react';

import FlashCards from '../components/FlashCards';
import Prompts from '../components/Prompts';

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    // randomizing
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // swap
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

const App = () => {
// next button
  const [card, CardIndex] = useState(0);
// shuffling cards
  const [prompts, ShuffledPrompts] = useState([]);
// reseting cards to the question side when moving to the next set of cards
  const [reset, resetFlip] = useState(false);

  useEffect(() => {
    const shuffled = shuffle([...Prompts]);
    ShuffledPrompts(shuffled);
  }, []);

  const nextCard = () => {
    if (card < prompts.length - 1) {
      CardIndex(card + 1);
    } 
    // recycles the cards once they have all been reviewed
    else 
    {
      CardIndex(0);
    }
    // resets the flip status of the card to always show the front side when button is pressed (question side)
    resetFlip(!reset);
  };

  return (
    <div className = "app">
      <div className = "header">
        <h2> Soccer Player Quiz </h2>
        <h3> How good is your soccer knowledge? Let's see if you know some iconic footballers! </h3>
        <h4> There are {prompts.length} cards. </h4>
        <div className = "flashcards">
          {prompts.length > 0 && (<FlashCards key = {reset} prompt ={prompts[card]}/>)}
        </div>
        <button className = "next" onClick={nextCard}>Next →</button>
      </div>
    </div>
  );
};

export default App;