import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For .toHaveClass matcher
import App from './App';

// Mock the setTimeout/clearTimeout for controlling animation timing
jest.useFakeTimers();

describe('App Component Integration Tests', () => {
  test('renders the calculator heading', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', { name: /react calculator/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('applies "jazzy-active" class to App div when "7" is clicked and removes it after timeout', async () => {
    render(<App />);
    const appDiv = screen.getByRole('heading', { name: /react calculator/i }).parentElement; // Get the main App div

    // Check initial state
    expect(appDiv).not.toHaveClass('jazzy-active');

    // Click the '7' button
    fireEvent.click(screen.getByText('7'));

    // Check if class is added immediately
    expect(appDiv).toHaveClass('jazzy-active');

    // Fast-forward time past the 500ms timeout
    jest.advanceTimersByTime(500);

    // Check if class is removed after timeout
    await waitFor(() => {
      expect(appDiv).not.toHaveClass('jazzy-active');
    });
  });

  test('applies "melting" class to Calculator div when "1" is clicked', () => {
    const { container } = render(<App />);
    // Find the calculator div more reliably
    const calculatorDiv = container.querySelector('.calculator'); 
    
    // Check initial state
    expect(calculatorDiv).not.toHaveClass('melting');

    // Click the '1' button
    fireEvent.click(screen.getByText('1'));

    // Check if the melting class is applied
    expect(calculatorDiv).toHaveClass('melting');
  });
});

// Restore real timers after tests
afterAll(() => {
  jest.useRealTimers();
});
