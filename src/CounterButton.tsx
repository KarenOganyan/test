import React, { useState } from 'react';

type ButtonProps = {
  value: number;
  onClick: (value: number) => void;
};

export default function CounterButton({ value, onClick }: ButtonProps): JSX.Element {
  const [disabled, setDisabled] = useState(false);

  const handleClick = (): void => {
    onClick(value);
    setDisabled(true);
    setTimeout(() => setDisabled(false), value * 500);
  };

  return (
    <button type="button" className="counter-button" onClick={handleClick} disabled={disabled}>
      {value}
    </button>
  );
}
