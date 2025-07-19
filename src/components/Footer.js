import React from 'react';
import '../styles/Footer.css';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`footer ${darkMode ? 'footer-dark' : 'footer-light'}`}>
      <p>☕ Crafted through <span className="highlight">code</span>, <span className="highlight">caffeine</span> and <span className="highlight">curiosity</span>.</p>
    </footer>
  );
};

export default Footer;
