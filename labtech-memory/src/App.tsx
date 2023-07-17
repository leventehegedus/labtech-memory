/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

const DEFAULT_SIZE = 16;

function App() {

  const [size, setSize] = useState(DEFAULT_SIZE)
  const [cards, setCards] = useState<number[]>([])
  const [openCards, setOpenCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<number[]>([])
  const timeout = useRef(null);

  useEffect(() => {
    generateMemory(size)
  }, [])


  const evaluate = () => {
    const [first, second] = openCards;
    if (Math.floor(first / 2) === Math.floor(second / 2)) {
      setClearedCards([...clearedCards, first, second]);
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  useEffect(() => {
    let timeout: any = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  const generateNumbers = (size: number): number[] => {
    const numbersArray: number[] = [];
    for (let i = 0; i < size; i++) {
      numbersArray.push(i);
    }
    return numbersArray;
  }

  const generateMemory = (size: number): void => {

    const numbers = generateNumbers(size);
    const random = shuffleArray(generateNumbers(size));
    if (JSON.stringify(random) === JSON.stringify(numbers)) {
      generateMemory(size);
    }
    setCards(random);
  };

  const shuffleArray = (array: number[]) => {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  const turnCard = (card: number) => {
    const arrayHelper = [...openCards];
    if (arrayHelper && !arrayHelper.includes(card) && !clearedCards.includes(card)) {
      arrayHelper.push(card);
    }
    setOpenCards(arrayHelper);
    console.log(arrayHelper)
  }

  const renderCard = (card: number) => {
    return (
      <div className={`memory-card ${openCards.includes(card) ? 'active' : ''} ${clearedCards.includes(card) ? 'cleared' : ''}`} onClick={() => turnCard(card)}>{Math.floor(card / 2)}</div>
    )
  }

  return (
    <>
      <div>
        <div className='memory-game-container'>
          {cards.map(card => renderCard(card))}
        </div>
        <button onClick={() => generateMemory(size)}>new numbers</button>
      </div>
    </>
  )
}

export default App
