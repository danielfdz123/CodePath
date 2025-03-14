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
// next & prev button
  const [card, CardIndex] = useState(0);
// shuffling cards
  const [prompts, ShufflePrompts] = useState(Prompts);
// reseting cards to the question side when moving to the next set of cards
  const [reset, resetFlip] = useState(false);

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

  const prevCard = () => {
    if (card > 0) {
      CardIndex(card - 1);
    } 
    // cycles back to the last card if on the first one
    else 
    {
      CardIndex(card - 1);
    }
    // resets the flip status of the card to always show the front side when button is pressed (question side)
    resetFlip(!reset);
  };

  const shuffleCards = () => {
    const shuffled = shuffle([...prompts]);
    ShufflePrompts(shuffled);
  };

  const card1 = card === 0;                       // Sets varibled 'card1' to the 1st card
  const lastCard = card === prompts.length - 1;   // Sets variable 'lastCard' to the Last Card

  return (
    <div className = "app">
      <div className = "header">
        <h2> Soccer Player Quiz </h2>
        <h3> How good is your soccer knowledge? Let's see if you know some iconic footballers! </h3>
        <h4> There are {prompts.length} cards. </h4>
        <div className = "flashcards">
          {prompts.length > 0 && (<FlashCards key = {reset} prompt ={prompts[card]}/>)}
        </div>
        <div className = "input">
          <h4> Guess the answer here: </h4>
          <button className = "submit"> Submit </button>
        </div>
        <button className = {`prev ${card1 ? 'disable' : ''}`} onClick={prevCard} disabled = {card1}>
          Previous ←
        </button>
        <button className = {`next ${lastCard ? 'disable' : ''}`} onClick={nextCard} disabled={lastCard}>
          Next →
        </button>
        <button className = "shuffle" onClick={shuffleCards}>Shuffle Deck</button>
      </div>
    </div>
  );
};

export default App;