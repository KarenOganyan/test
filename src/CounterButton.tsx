import React, { useState, useEffect } from 'react';
import './index.css';

type ButtonProps = {
  value: number;
  delay: number;
  onClick: () => void;
};

export default function CounterButton({ value, delay, onClick }: ButtonProps): JSX.Element {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (): void => {
    onClick();
    setDisabled(true);
  };

  useEffect(() => {
    if (disabled) {
      const timer = setTimeout(() => setDisabled(false), delay);
      return () => clearTimeout(timer);
    }
  }, [disabled, delay]);

  return (
    <button type="button" className="counter-button" onClick={handleClick} disabled={disabled}>
      {value}
    </button>
  );
}