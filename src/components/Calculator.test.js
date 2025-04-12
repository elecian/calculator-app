import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  let onJazzyTriggerMock;
  let onMeltTriggerMock;

  beforeEach(() => {
    // Create mock functions for the triggers before each test
    onJazzyTriggerMock = jest.fn();
    onMeltTriggerMock = jest.fn();
  });

  test('renders initial display with 0', () => {
    render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} 
      />
    );
    // Use a regex to find the display element, allowing for potential whitespace
    expect(screen.getByText(/^0$/)).toBeInTheDocument(); 
  });

  test('displays a digit when a number button is clicked', () => {
    render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} 
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(screen.getByText(/^2$/)).toBeInTheDocument();
  });

  test('displays ":)" and calls onJazzyTrigger when "7" is clicked', () => {
    render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} 
      />
    );
    fireEvent.click(screen.getByText('7'));
    expect(screen.getByText(/^\:\)$/)).toBeInTheDocument(); // Check for happy face
    expect(onJazzyTriggerMock).toHaveBeenCalledTimes(1); // Check if trigger was called
    expect(onMeltTriggerMock).not.toHaveBeenCalled(); // Ensure melt trigger wasn't called
  });

  test('displays "1" and calls onMeltTrigger when "1" is clicked', () => {
    render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} 
      />
    );
    fireEvent.click(screen.getByText('1'));
    expect(screen.getByText(/^1$/)).toBeInTheDocument(); // Check for '1'
    expect(onMeltTriggerMock).toHaveBeenCalledTimes(1); // Check if melt trigger was called
    expect(onJazzyTriggerMock).not.toHaveBeenCalled(); // Ensure jazzy trigger wasn't called
  });

  test('applies "melting" class when isMelting prop is true', () => {
    const { container } = render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={true} // Set isMelting to true
      />
    );
    // Find the calculator div (it's the first child of the container)
    const calculatorDiv = container.firstChild; 
    expect(calculatorDiv).toHaveClass('calculator melting');
  });

  test('does not apply "melting" class when isMelting prop is false', () => {
    const { container } = render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} // Set isMelting to false
      />
    );
     const calculatorDiv = container.firstChild;
    expect(calculatorDiv).toHaveClass('calculator');
    expect(calculatorDiv).not.toHaveClass('melting');
  });
});
