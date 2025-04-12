import React from 'react';
import Button from './Button';

const Keypad = ({ onButtonClick }) => {
  const buttons = [
    { value: 'C', className: 'clear' },
    { value: '±', className: 'operator' },
    { value: '%', className: 'operator' },
    { value: '÷', className: 'operator' },
    { value: '7', className: 'number' },
    { value: '8', className: 'number' },
    { value: '9', className: 'number' },
    { value: '×', className: 'operator' },
    { value: '4', className: 'number' },
    { value: '5', className: 'number' },
    { value: '6', className: 'number' },
    { value: '-', className: 'operator' },
    { value: '1', className: 'number' },
    { value: '2', className: 'number' },
    { value: '3', className: 'number' },
    { value: '+', className: 'operator' },
    { value: '0', className: 'number zero' },
    { value: '.', className: 'number' },
    { value: '=', className: 'equals' },
  ];

  return (
    <div className="keypad">
      {buttons.map((button, index) => (
        <Button
          key={index}
          value={button.value}
          className={button.className}
          onClick={onButtonClick}
        />
      ))}
    </div>
  );
};

export default Keypad;
