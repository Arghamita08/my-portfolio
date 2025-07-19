import React from 'react';
import '../styles/QueenCard.css';
import QueenImage from '../assets/QueenImage.png';
import ProfileImage from '../assets/ProfileImage.jpeg';

const QueenCard = ({ isFlipped, info, contentType }) => {
  const renderBackContent = () => {
    switch (contentType) {
      case 'experience':
        return (
          <>
            <h3>💼 MY Experience So Far</h3>
            <p>{info.experience || 'Details about work experience go here.'}</p>
          </>
        );
      case 'skills':
        return (
          <>
            <h3>👩🏻‍💻Things I Know And Learning</h3>
            <ul className="skills-list">
              {(info.skills || 'React, HTML, CSS, JavaScript, C++, SQL').split(',').map((skill, i) => {
                const trimmedSkill = skill.trim();
                let skillUrl = '';

                if (trimmedSkill === 'React') {
                  skillUrl = 'https://react.dev/'; 
                } else if (trimmedSkill === 'HTML') {
                  skillUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTML';
                } else if (trimmedSkill === 'CSS') {
                  skillUrl = 'https://developer.mozilla.org/en-US/docs/Web/CSS'; 
                } else if (trimmedSkill === 'JavaScript') {
                  skillUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'; 
                } else if (trimmedSkill === 'C++') {
                  skillUrl = 'https://en.cppreference.com/w/'; 
                } else if (trimmedSkill === 'SQL') {
                  skillUrl = 'https://www.w3schools.com/sql/'; 
                }else {
                  skillUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(trimmedSkill)}`;
                }
                return (
                  <li key={i}>
                    <a href={skillUrl} target="_blank" rel="noopener noreferrer">
                      {trimmedSkill}
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        );
      case 'hobbies':
        return (
          <>
            <h3>Beyond Coding 🍀</h3>
            <ul className="hobbies-list">
              {(info.hobbies || 'Cooking, Writing, Gardening').split(',').map((hobby, i) => (
                <li key={i}>{hobby.trim()}</li>
              ))}
            </ul>
          </>
        );
      case 'profile':
        return (
          <>
            {true && (
              <div className='profile-picture'>
              <img
                src={ProfileImage}
                alt="Profile"
                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
              /></div>
            )}
            <h3>✍️ A Little About Me</h3>
            <p dangerouslySetInnerHTML={{ __html: info.summary || 'Want to be that developer who has a passion for blending creavity and codes, </>' }}></p>
          </>
        );
      default:
        return (
          <>
            <h3>{info.name}</h3>
            <p>{info.description}</p>
            {info.skills && <p>Skills: {info.skills}</p>}
            {info.contact && <p>Contact: {info.contact}</p>}
          </>
        );
    }
  };

  return (
    <div className={`queen-card-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="queen-card-inner">
        <div className="queen-card-front">
          <div className="queen-card-design">
            <span className="rank top-left">Q</span>
            <span className="suit top-left">&#x2665;</span>
            <img src={QueenImage} alt="Queen of Hearts" className="queen-face-image" />
            <span className="rank bottom-right">Q</span>
            <span className="suit bottom-right">&#x2665;</span>
          </div>
        </div>
        <div className="queen-card-back">{renderBackContent()}</div>
      </div>
    </div>
  );
};

export default QueenCard;