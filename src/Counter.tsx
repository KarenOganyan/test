import React, { useState, useEffect, useRef } from 'react';
import CounterButton from './CounterButton';
import './index.css';

type ButtonConfig = {
  id: string;
  value: number;
  delay: number;
};

const buttonConfigs: ButtonConfig[] = [
  { id: 'btn-1', value: 1, delay: 500 },
  { id: 'btn-2', value: 2, delay: 1000 },
  { id: 'btn-3', value: 3, delay: 1500 },
];

const decrementInterval = 1000;
const idleTimeLimit = 10000;

export default function Counter(): JSX.Element {
  const [count, setCount] = useState(0);
  const lastActionTime = useRef(Date.now());
  const [isDecrementing, setIsDecrementing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeElapsed = now - lastActionTime.current;
      if (timeElapsed >= idleTimeLimit && count > 0) {
        setIsDecrementing(true);
      }
      if (isDecrementing && count > 0) {
        setCount((prevCount) => {
          const newCount = prevCount - 1;
          if (newCount <= 0) {
            setIsDecrementing(false);
            return 0;
          }
          return newCount;
        });
      }
    }, decrementInterval);

    return () => clearInterval(interval);
  }, [isDecrementing, count]);

  const handleButtonClick = (value: number): void => {
    setCount((prevCount) => prevCount + value);
    lastActionTime.current = Date.now();
    setIsDecrementing(false);
  };

  return (
    <div className="counter-container">
      <h1>Counter: {count}</h1>
      <div className="counter-buttons">
        {buttonConfigs.map(({ id, value, delay }) => (
          <CounterButton
            key={id}
            value={value}
            delay={delay}
            onClick={() => handleButtonClick(value)}
          />
        ))}
      </div>
    </div>
  );
}