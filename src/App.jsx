import './App.css';
import React, { useState } from 'react';

import FlashCards from '../components/FlashCards';
import Prompts from '../components/Prompts';

const App = () => {
  const [card, CardIndex] = useState(0);

  const nextCard = () => {
    if (card < Prompts.length - 1) {
      CardIndex(card + 1);
    }
  };

  return (
    <div className = "app">
      <div className = "header">
        <h2> Soccer Player Quiz </h2>
        <h3> How good is your soccer knowledge? Let's see if you know some iconic footballers! </h3>
        <h4> There are {Prompts.length} cards. </h4>
        <div className = "flashcards">
          <FlashCards prompt = {Prompts[card]} />
        </div>
        <button className = "next" onClick={nextCard}>Next →</button>
      </div>
    </div>
  );
};

export default App;