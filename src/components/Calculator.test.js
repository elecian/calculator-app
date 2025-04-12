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
    // Use the test ID to find the display element reliably
    const displayElement = screen.getByTestId('calculator-display'); 
    expect(displayElement).toHaveTextContent(/^0$/); 
    expect(displayElement).toBeInTheDocument();
  });

  test('displays a digit when a number button is clicked', () => {
    render(
      <Calculator 
        onJazzyTrigger={onJazzyTriggerMock} 
        onMeltTrigger={onMeltTriggerMock} 
        isMelting={false} 
      />
    );
    // Click the button '2'
    fireEvent.click(screen.getByRole('button', { name: '2' })); 
    // Check the display content using the test ID
    const displayElement = screen.getByTestId('calculator-display'); 
    expect(displayElement).toHaveTextContent(/^2$/); 
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
    // Click the button specifically
    fireEvent.click(screen.getByRole('button', { name: '1' })); 
    
    // Use the data-testid to find the display element reliably
    const displayElement = screen.getByTestId('calculator-display'); 
    
    expect(displayElement).toHaveTextContent(/^1$/); // Check display content
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
