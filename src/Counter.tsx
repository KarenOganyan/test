import React, { useState, useEffect } from 'react';
import CounterButton from './CounterButton';

export default function Counter(): JSX.Element {
  const [count, setCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastUpdated >= 10000 && count > 0) {
        setCount((prevCount) => Math.max(prevCount - 1, 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated, count]);

  const handleButtonClick = (value: number) => {
    setCount(count + value);
    setLastUpdated(Date.now());
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <div>
        <CounterButton value={1} onClick={handleButtonClick} />
        <CounterButton value={2} onClick={handleButtonClick} />
        <CounterButton value={3} onClick={handleButtonClick} />
      </div>
    </div>
  );
}
