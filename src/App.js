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

const AnimatedGradientText = ({ lines }) => {
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
    <div className="animated-gradient-heading">
      {lines.map((line, idx) => (
        <motion.h2
          key={idx}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: idx * 0.6,
                staggerChildren: 0.05,
              },
            },
          }}
          className="animated-line"
        >
          {line.split('').map((char, i) => (
            <motion.span key={i} variants={itemVariants}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>
      ))}
    </div>
  );
};

function App() {
  const originalDeck = useRef([
    { id: 1, type: 'King', component: KingCard, contentType: 'resume' },
    { id: 2, type: 'Queen', component: QueenCard, info: { experience: '45 days Internship at NIC Agartala' }, contentType: 'experience' },
    { id: 3, type: 'Joker', component: JokerCard, contentType: 'theme' },
    { id: 4, type: 'Ace', component: AceCard },
    { id: 5, type: 'King', component: KingCard, contentType: 'social' },
    { id: 6, type: 'Queen', component: QueenCard, info: { skills: 'React, HTML, CSS, JavaScript, C++, SQL' }, contentType: 'skills' },
    { id: 7, type: 'Joker', component: JokerCard, contentType: 'future' },
    { id: 8, type: 'King', component: KingCard, contentType: 'contact' },
    { id: 9, type: 'Queen', component: QueenCard, info: { hobbies: 'Cooking, Writing, Gardening' }, contentType: 'hobbies' },
    { id: 10, type: 'Queen', component: QueenCard, info: { image: 'assets/ProfileImage.jpeg', summary: 'On my way to become a Software Developer who loves code and creativity </>' }, contentType: 'profile' },
  ]);

  const [cards, setCards] = useState(originalDeck.current);
  const [flippedCards, setFlippedCards] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const flipSoundRef = useRef(new Audio('/flipcard.mp3'));
  const [filterType, setFilterType] = useState('All');

  const handleCardClick = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
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
  const handleFilterChange = (type) => setFilterType(type);

  const filteredCards = cards.filter(card => filterType === 'All' || card.type === filterType);

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

  if (currentCardsForLayout.length > 0) rows.push(currentCardsForLayout.splice(0, 4));
  if (currentCardsForLayout.length > 0) rows.push(currentCardsForLayout.splice(0, 3));
  if (currentCardsForLayout.length > 0) rows.push(currentCardsForLayout.splice(0, 2));
  if (currentCardsForLayout.length > 0) rows.push(currentCardsForLayout.splice(0, 1));

  return (
    <motion.div className={`portfolio-container ${darkMode ? 'dark-mode' : ''}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="top-bar">
        <AnimatedGradientText lines={[
          'FLIP A CARD, MAKE A MOVE...',
          'WELCOME TO MY WORLD OF CODE,',
          'CREATIVITY AND A BIT OF CHAOS!',
        ]} />

        <div className="controls">
          <button onClick={toggleTheme}>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
          <button onClick={handleShuffleToggle}>{isShuffled ? '♻️ Restore Deck' : '🔀 Shuffle Deck'}</button>
          <button onClick={toggleSound}>{soundOn ? '🔊 Sound On' : '🔇 Sound Off'}</button>
        </div>

        <div className="filter-controls">
          {['All', 'King', 'Queen', 'Joker', 'Ace'].map(type => (
            <button key={type} onClick={() => handleFilterChange(type)} className={filterType === type ? 'active-filter' : ''}>
              {type === 'All' ? 'All Cards' : type}
            </button>
          ))}
        </div>
      </div>

      {rows.map((rowCards, index) => <React.Fragment key={index}>{renderCardRow(rowCards)}</React.Fragment>)}

      {filteredCards.length === 0 && <p className="no-cards-message">No cards match the current filter.</p>}
      <Footer darkMode={darkMode} />
    </motion.div>
  );
}

export default App;
