import React from 'react';
import '../styles/KingCard.css';
import KingImage from '../assets/kingImage.png';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa';

const KingCard = ({ isFlipped, info = {}, contentType = '' }) => {
  const renderBackContent = () => {
    switch (contentType) {

      case 'social':
  return (
    <div className="social-links">
      <h3>🌐 Let's Connect</h3>
      <ul>
        <li>
          <a
            href="https://codechef.com/users/Arghamita_08"
            className="codechef"
            target="_blank"
            rel="noreferrer"
          >
            CodeChef <span className="star">⭐</span><span className="star">⭐</span>
          </a>
        </li>
        <li>
          <a
            href="https://codeforces.com/profile/Arghamita_08"
            className="codeforces"
            target="_blank"
            rel="noreferrer"
          >
            Codeforces
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Arghamita08"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://leetcode.com/Arghamita_08"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            LeetCode
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/arghamita-das-702a84266"
            className="social"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );

    case 'resume':
  return (
    <div className="resume-section">
      <h3>📄 My Resume</h3>
      <a
        href="Arghamita.pdf" // replace with your actual resume link
        target="_blank"
        rel="noopener noreferrer"
        className="resume-button"
      >
        View Fullscreen
      </a>
    </div>
  );

      case 'contact':
  return (
    <form
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST"
      className="contact-form"
    >
      <h3>📬 Contact Me</h3>
      <div className="contact-me">
  <div className="form-group">
    <div className="icon"><FaUser /></div>
    <input type="text" name="name" placeholder="Your Name" required onClick={e => e.stopPropagation()} />
  </div>
  <div className="form-group">
    <div className="icon"><FaEnvelope /></div>
    <input type="email" name="email" placeholder="Your Email" required onClick={e => e.stopPropagation()} />
  </div>
  <div className="form-group">
    <div className="icon"><FaComment /></div>
    <textarea name="message" placeholder="Your Message" required onClick={e => e.stopPropagation()} />
  </div>
</div>

      <button type="submit">Send</button>
    </form>
  );


      default:
        return (
          <>
            <h3>{info?.name || 'King Card'}</h3>
            <p>{info?.description || 'No additional info.'}</p>
            {info?.skills && <p>Skills: {info.skills}</p>}
            {info?.contact && <p>Contact: {info.contact}</p>}
          </>
        );
    }
  };

  return (
    <div className={`king-card-container ${isFlipped ? 'flipped' : ''}`}>
      <div className="king-card-inner">
        <div className="king-card-front">
          <div className="king-card-design">
            <span className="rank top-left">K</span>
            <span className="suit top-left">&#x2665;</span>
            <img src={KingImage} alt="King of Hearts" className="king-face-image" />
            <span className="rank bottom-right">K</span>
            <span className="suit bottom-right">&#x2665;</span>
          </div>
        </div>

        <div className="king-card-back">
          {renderBackContent()}
        </div>
      </div>
    </div>
  );
};

export default KingCard;

//onClick={e => e.stopPropagation()}
