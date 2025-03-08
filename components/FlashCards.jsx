import React, { useState } from 'react';

const FlashCards = ({ prompt }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped); 
    };
    
    return (
        <div className = "flip-card" onClick={flipCard}>
            <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>

                {/* Front Side of Card */}
                <div className = "flip-card-front">
                    <h3>{prompt.q}</h3>
                    <ul>
                        <li>{prompt.h1}</li>
                        <li>{prompt.h2}</li>
                        <li>{prompt.h3}</li>
                    </ul>
                </div>

                {/* Back Side of Card */}
                <div className = "flip-card-back">
                    <h3>{prompt.a}</h3>
                </div>
            </div>
        </div>
  );
};

export default FlashCards;
