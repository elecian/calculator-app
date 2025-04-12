import React, { useState } from 'react';
import Calculator from './components/Calculator';
import './styles/Calculator.css';
import './App.css';

function App() {
  const [isJazzyActive, setIsJazzyActive] = useState(false);
  const [isMelting, setIsMelting] = useState(false); // Add melting state

  const triggerJazzy = () => {
    setIsJazzyActive(true);
    // Remove the class after the animation duration (500ms)
    setTimeout(() => {
      setIsJazzyActive(false);
    }, 500);
  };

  // Function to trigger the melt animation
  const triggerMelt = () => {
    setIsMelting(true);
    // Optionally reset after some time if needed, but melt is usually one-way
  };

  return (
    <div className={`App ${isJazzyActive ? 'jazzy-active' : ''}`}>
      <h1>React Calculator</h1>
      <Calculator 
        onJazzyTrigger={triggerJazzy} 
        onMeltTrigger={triggerMelt} // Pass melt trigger
        isMelting={isMelting} // Pass melting state
      />
    </div>
  );
}

export default App;
