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
  const [card, CardIndex] = useState(0);                  // next & prev button
  const [prompts, ShufflePrompts] = useState(Prompts);    // shuffling cards
  const [reset, resetFlip] = useState(false);             // reset to question side of cards
  const [guess, guessPrompt] = useState('');              // checks guesses from the user
  const [answer, checkAns] = useState();                  // correct answer of the proompt
  const [streak, streakCount] = useState(0);              // manages streak of the user
  const [record, recordCount] = useState(0);              // manages the uses streak record

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
    // resets input box to BLANK
    guessPrompt('');
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
    // resets input box to BLANK
    guessPrompt('');        
  };

  const shuffleCards = () => {
    const shuffled = shuffle([...prompts]);
    ShufflePrompts(shuffled);
  };

  const guessButton = () => {
    // using the 'some' function, it allows there to be multiple answers accepted for each question via the JSON
    if (prompts[card].a.some(ans => ans.toLowerCase() === guess.toLowerCase())) 
    {
      checkAns('correct');
      streakCount(streak + 1);
      if(streak + 1 > record)
      {
        recordCount(streak + 1);
      }
      flipCard();
    } 
    else 
    {
      checkAns(`incorrect`);
      streakCount(0);
    }
    // resets input box to BLANK
    guessPrompt('');
  };
  
  const firstCard = card === 0;                   // Sets varibled 'firstCard' to the 1st card
  const lastCard = card === prompts.length - 1;   // Sets variable 'lastCard' to the Last Card

  return (
    <div className = "app">
      <div className = "header">
        <h2> Soccer Player Quiz </h2>
        <h3> How good is your soccer knowledge? Let's see if you know some iconic footballers! </h3>
        <h4> There are {prompts.length} cards. </h4>
        <h5> Current Streak: {streak}; Longest Streak: {record} </h5>
        <div className = "flashcards">
          {prompts.length > 0 && (<FlashCards key = {reset} prompt ={prompts[card]}/>)}
        </div>
       
        <div className="input">
 <h4>Guess the answer here: </h4>

        <input
            type="text"
            value={guess}
            onChange={(e) => guessPrompt(e.target.value)}
        />
          <button className= "submit" onClick={guessButton}>Submit</button>
        </div>
        <button className = {`prev ${firstCard ? 'disable' : ''}`} onClick={prevCard} disabled = {firstCard}>
          ← Previous 
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