import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const DEFAULT_SIZE = 16;

function App() {

  const [size, setSize] = useState(DEFAULT_SIZE)
  const [cards, setCards] = useState<number[]>([])

  useEffect(() => {
    generateMemory(size)
  }, [])

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

  return (
    <>
      <div>
        {cards.map(card => (
          <span>{card} </span>
        ))}
      </div>
      <div>
        {cards.map(card => (
          <span>{Math.floor(card / 2)} </span>
        ))}
      </div>
      <button onClick={() => generateMemory(size)}>new numbers</button>
    </>
  )
}

export default App
