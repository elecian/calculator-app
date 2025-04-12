import React, { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

// Add onMeltTrigger and isMelting to props
const Calculator = ({ onJazzyTrigger, onMeltTrigger, isMelting }) => { 
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleButtonClick = (value) => {
    switch (value) {
      case 'C':
        clearDisplay();
        break;
      case '=':
        if (operator && !waitingForSecondOperand) {
          performOperation('=');
        }
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        performOperation(value);
        break;
      case '.':
        inputDecimal();
        break;
      case '±':
        toggleSign();
        break;
      case '%':
        inputPercent();
        break;
      default:
        if (value === '7') {
          setDisplay(':)');
          onJazzyTrigger(); // Call the jazzy trigger function
        } else if (value === '1') {
          onMeltTrigger(); // Call the melt trigger function
          // Optionally display something or just let it melt
          inputDigit(value); // Still input the digit '1' for now
        } else {
          inputDigit(value);
        }
        break;
    }
  };

  // Add the 'melting' class conditionally
  return (
    <div className={`calculator ${isMelting ? 'melting' : ''}`}> 
      <Display value={display} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
