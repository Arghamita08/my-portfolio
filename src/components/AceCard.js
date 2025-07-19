import React from 'react';
import '../styles/AceCard.css';
import AceImage from '../assets/aceImage.png';
import EducationTimeline from './EducationTimeline';

const AceCard = ({ isFlipped, info={}, darkMode }) => {
  const suitSymbol = '&#x2665;'; 
  const suitColor = '#ff0000'; 
  return (
    <div className={`ace-card-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="ace-card-inner">
       
        <div className="ace-card-front">
          <div className="ace-card-design">
            <span className="rank top-left">A</span>
            <span
              className="suit top-left"
              style={{ color: suitColor }}
              dangerouslySetInnerHTML={{ __html: suitSymbol }}
            ></span>

            <img
              src={AceImage}
              alt={`Ace of ${info.suit || 'Spades'}`}
              className="ace-face-image"
            />

            <span className="rank bottom-right">A</span>
            <span
              className="suit bottom-right"
              style={{ color: suitColor }}
              dangerouslySetInnerHTML={{ __html: suitSymbol }}
            ></span>
          </div>
        </div>

        <div className="ace-card-back">
          
          <div className="ace-education-section">
            <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>🎓 My Education</h4>
            <br/>
              <EducationTimeline animate={isFlipped} />
          </div>

          <h3 className="ace-info-name">{info.name}</h3>
          <p className="ace-info-description">{info.description}</p>
          {info.skills && (
            <p className="ace-info-skills">
              <strong>Skills:</strong> {info.skills}
            </p>
          )}
          {info.contact && (
            <p className="ace-info-contact">
              <strong>Contact:</strong> {info.contact}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AceCard;
