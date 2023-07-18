import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import Card from './Card';

const DEFAULT_SIZE = 16;

const App = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [cards, setCards] = useState<number[]>([]);
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [clearedCards, setClearedCards] = useState<number[]>([]);
  const [isGameStarted, setGameStarted] = useState<boolean>(false);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    generateMemory(size);
  }, []);

  useEffect(() => {
    if (openCards.length === 2) {
      const timeout = setTimeout(evaluate, 300);
      return () => clearTimeout(timeout);
    }
  }, [openCards]);

  useEffect(() => {
    if (clearedCards.length === size) {
      setGameOver(true);
    }
  }, [clearedCards]);

  const evaluate = () => {
    const [first, second] = openCards;
    if (Math.floor(first / 2) !== Math.floor(second / 2)) {
      timeoutRef.current = window.setTimeout(() => {
        setOpenCards([]);
      }, 500);
      return;
    }
    setClearedCards([...clearedCards, first, second]);
    setOpenCards([]);
  };

  const generateNumbers = (size: number): number[] => {
    const numbersArray: number[] = [];
    for (let i = 0; i < size; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  };

  const generateMemory = (size: number): void => {
    const numbers = generateNumbers(size);
    let random = shuffleArray(generateNumbers(size));
    while (JSON.stringify(random) === JSON.stringify(numbers)) {
      random = shuffleArray(generateNumbers(size));
    }
    setCards(random);
  };

  const shuffleArray = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]];
    }
    return newArray;
  };

  const turnCard = (card: number) => {
    if (openCards.length >= 2 || clearedCards.includes(card) || isGameOver) {
      return;
    }
    setOpenCards((prevOpenCards) => [...prevOpenCards, card]);
  };

  const renderCard = (card: number) => {
    const isActive = openCards.includes(card);
    const isCleared = clearedCards.includes(card);
    return <Card key={card} card={card} isActive={isActive} isCleared={isCleared} onClick={() => turnCard(card)} />;
  };

  const startNewGame = () => {
    generateMemory(size);
    setOpenCards([]);
    setClearedCards([]);
    setGameOver(false);
    setGameStarted(true);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let numberOfPairs = parseInt(event.target.value, 10);
    if (numberOfPairs < 1) {
      numberOfPairs = 1;
    }
    setSize(numberOfPairs * 2);
  };

  const renderGameOver = () => (
    <div className='game-over'>
      <div className='title'>You win!</div>
      {renderChangeSizeInput()}
      <button onClick={startNewGame}>Play again</button>
    </div>
  );

  const renderGameInstructions = () => (
    <div className='game-instructions'>
      <div className='title'>Game instructions</div>
      <div className='instructions'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, obcaecati quo corrupti eaque deserunt consequuntur quisquam sint cum itaque neque natus tenetur perspiciatis consectetur suscipit similique necessitatibus optio sit odio.</div>
      {renderChangeSizeInput()}
      <button onClick={startNewGame}>Play</button>
    </div>
  );

  const renderChangeSizeInput = () => (
    <div className='change-size-container'>
      <label htmlFor='size-input'>Number of pairs:</label>
      <input id='size-input' type='number' min='1' max='100' value={size / 2} onChange={handleSizeChange} />
    </div>
  )

  return (
    <>
      <div className='game-title'>Memory game</div>
      <div>
        <div className='memory-game-container'>
          {!isGameStarted && renderGameInstructions()}
          {isGameStarted && cards.map((card) => renderCard(card))}
          {isGameOver && renderGameOver()}
        </div>
      </div>
    </>
  );
}

export default App;