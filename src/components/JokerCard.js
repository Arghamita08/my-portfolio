import React from 'react';
import '../styles/JokerCard.css';
import JokerImage from '../assets/jokerImage.png';

const JokerCard = ({ isFlipped, contentType = '', info = {} }) => {
  const renderBackContent = () => {
    switch (contentType) {
      case 'theme':
        return (
          <>
            <h3>🃏 Why I Chose the Card Theme</h3>
            <p className='paragraph'>
              I chose the card theme to add a playful, interactive twist to my portfolio : 
              tech & creativity? 
              Just like in life, every card holds something unexpected on the other side : 
              a little surprise, a hidden story, a deeper layer. 
              My journey is a deck of experiences and you're invited to flip through it!
            </p>
          </>
        );

      case 'future':
        return (
          <>
  <h3>🎯 Future Goals</h3>
  <ul className="goals-list">
    <li>Become a <strong>Software Developer</strong></li>
    <li>Create a <strong>developer tool or product</strong> of my own</li>
    <li>Pursue <strong>continuous learning</strong></li>
  </ul>
</>
        );

      default:
        return (
          <>
            <h3>{info.name || 'Joker Card'}</h3>
            <p>{info.description || 'No additional info provided.'}</p>
            {info.skills && <p>Skills: {info.skills}</p>}
            {info.contact && <p>Contact: {info.contact}</p>}
          </>
        );
    }
  };

  return (
    <div className={`joker-card-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="joker-card-inner">
       
        <div className="joker-card-front">
          <div className="joker-card-design">
            <span className="joker-text top-left">J</span>
            <span className="suit top-left">&#x2665;</span>
            <img src={JokerImage} alt="Joker Card" className="joker-face-image" />
            <span className="suit bottom-right">&#x2665;</span>
            <span className="joker-text bottom-right">J</span>
          </div>
        </div>

       <div className="joker-card-back">
  {renderBackContent()}
</div>
      </div>
    </div>
  );
};

export default JokerCard;