import React from 'react';
import '../styles/Card.css';

function Card({ type, info, isFlipped, darkMode }) {
  
  const cardFrontContent = <h2>{info.name || type}</h2>;

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="card-front">
        {cardFrontContent}
      </div>
      <div className="card-back">
        <h3>{info.name}</h3>
        <p>{info.description}</p>
        {info.skills && <p><strong>Skills:</strong> {info.skills}</p>}
        {info.contact && <p><strong>Contact:</strong> {info.contact}</p>}
      </div>
    </div>
  );
}

export default Card;