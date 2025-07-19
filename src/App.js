import React, { useState, useRef } from 'react';
import QueenCard from './components/QueenCard';
import KingCard from './components/KingCard';
import Card from './components/Card';
import './App.css';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import JokerCard from './components/JokerCard';
import AceCard from './components/AceCard';
import Footer from './components/Footer';

const AnimatedGradientText = ({ text }) => {
  const characters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="animated-gradient-heading"
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={itemVariants}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

function App() {
  const originalDeck = useRef([
    { id: 1, type: 'King', component: KingCard, contentType: 'resume',},
    { id: 2, type: 'Queen', component: QueenCard, info: { experience: '45 days Internship at NIC Agartala' }, contentType: 'experience' },
    { id: 3, type: 'Joker', component: JokerCard, contentType: 'theme' },
    { id: 4, type: 'Ace', component: AceCard },
    { id: 5, type: 'King', component: KingCard, contentType: 'social',},
    { id: 6, type: 'Queen', component: QueenCard, info: { skills: 'React, HTML, CSS, JavaScript, C++, SQL' }, contentType: 'skills' },
    { id: 7, type: 'Joker', component: JokerCard, contentType: 'future'},
    { id: 8, type: 'King', component: KingCard, contentType: 'contact',},
    { id: 9, type: 'Queen', component: QueenCard, info: { hobbies: 'Cooking, Writing, Gardening' }, contentType: 'hobbies' },
    { id: 10, type: 'Queen', component: QueenCard, info: { image: 'assets/ProfileImage.jpeg', summary: 'On my way to become a Software Developer who loves code and creativity &lt;/&gt' }, contentType: 'profile' },
  ]);

  const [cards, setCards] = useState(originalDeck.current);
  const [flippedCards, setFlippedCards] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const flipSoundRef = useRef(new Audio('/flipcard.mp3'));

  const [filterType, setFilterType] = useState('All');

  const handleCardClick = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (soundOn) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch(() => {});
    }
  };

  const handleShuffleToggle = () => {
    if (!isShuffled) {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
    } else {
      setCards(originalDeck.current);
    }
    setIsShuffled(prev => !prev);
  };

  const toggleTheme = () => setDarkMode(prev => !prev);
  const toggleSound = () => setSoundOn(prev => !prev);

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  const filteredCards = cards.filter(card =>
    filterType === 'All' || card.type === filterType
  );

  const renderCardRow = (rowCards) => (
    <div className="card-row">
      {rowCards.map(card => {
        const CardComponent = card.component;
        return (
          <Tilt
            key={card.id}
            glareEnable={true}
            glareMaxOpacity={0.4}
            scale={1.05}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            className="tilt-wrapper"
          >
            <div onClick={() => handleCardClick(card.id)}>
              <CardComponent
                type={card.type}
                info={card.info}
                isFlipped={!!flippedCards[card.id]}
                darkMode={darkMode}
                contentType={card.contentType}
              />
            </div>
          </Tilt>
        );
      })}
    </div>
  );

  
  let currentCardsForLayout = [...filteredCards]; 
  const rows = [];

  if (currentCardsForLayout.length > 0) {
    rows.push(currentCardsForLayout.slice(0, 4));
    currentCardsForLayout = currentCardsForLayout.slice(4);
  }

  if (currentCardsForLayout.length > 0) {
    rows.push(currentCardsForLayout.slice(0, 3));
    currentCardsForLayout = currentCardsForLayout.slice(3);
  }

  if (currentCardsForLayout.length > 0) {
    rows.push(currentCardsForLayout.slice(0, 2));
    currentCardsForLayout = currentCardsForLayout.slice(2);
  }

  if (currentCardsForLayout.length > 0) {
    rows.push(currentCardsForLayout.slice(0, 1));
    currentCardsForLayout = currentCardsForLayout.slice(1);
  }

  return (
    <motion.div
      className={`portfolio-container ${darkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-bar">
        <AnimatedGradientText text="Flip a card, make a move...Welcome to my world of code, creativity and a bit of chaos!" />
        <div className="controls">
          <button onClick={toggleTheme} className={darkMode ? 'active-control' : ''}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <button onClick={handleShuffleToggle} className={isShuffled ? 'active-control' : ''}>
            {isShuffled ? '♻️ Restore Deck' : '🔀 Shuffle Deck'}
          </button>
          <button onClick={toggleSound} className={soundOn ? 'active-control' : ''}>
            {soundOn ? '🔊 Sound On' : '🔇 Sound Off'}
          </button>
        </div>

        <div className="filter-controls">
          <button
            onClick={() => handleFilterChange('All')}
            className={filterType === 'All' ? 'active-filter' : ''}
          >
            All Cards
          </button>
          <button
            onClick={() => handleFilterChange('King')}
            className={filterType === 'King' ? 'active-filter' : ''}
          >
            King
          </button>
          <button
            onClick={() => handleFilterChange('Queen')}
            className={filterType === 'Queen' ? 'active-filter' : ''}
          >
            Queen
          </button>
          <button
            onClick={() => handleFilterChange('Joker')}
            className={filterType === 'Joker' ? 'active-filter' : ''}
          >
            Joker
          </button>
          <button
            onClick={() => handleFilterChange('Ace')}
            className={filterType === 'Ace' ? 'active-filter' : ''}
          >
            Ace
          </button>
        </div>
      </div>

      {rows.map((rowCards, index) => (
        <React.Fragment key={index}>
          {renderCardRow(rowCards)}
        </React.Fragment>
      ))}

      {filteredCards.length === 0 && (
        <p className="no-cards-message">No cards match the current filter.</p>
      )}
      <Footer darkMode={darkMode} />
    </motion.div>
  );
}

export default App;