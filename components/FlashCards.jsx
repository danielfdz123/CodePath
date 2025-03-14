import React, { useState } from 'react';

const FlashCards = ({ prompt }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped); 
    };

    const difficultyClasses = {
        easy: "green",
        medium: "yellow",
        hard: "red",
    };

    return (
        <div className = "flip-card" onClick={flipCard}>
            <div className = {`flip-card-inner ${isFlipped ? 'flipped' : ''} ${difficultyClasses[prompt.difficulty]}`}>
        
                {/* Front Side of Card */}
                <div className = {`flip-card-front ${difficultyClasses[prompt.difficulty]}`}>
                    <h3>{prompt.q}</h3>
                    <ul>
                        <li>{prompt.h1}</li>
                        <li>{prompt.h2}</li>
                        <li>{prompt.h3}</li>
                    </ul>
                </div>

                {/* Back Side of Card */}
                <div className = {`flip-card-back ${difficultyClasses[prompt.difficulty]}`}>
                    <h3>{prompt.a}</h3>
                    <img className = "player" src={`/${prompt.img}.webp`} alt={prompt.a} />
                </div>
            </div>
        </div>
    );
};

export default FlashCards;