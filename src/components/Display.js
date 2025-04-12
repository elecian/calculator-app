import React from 'react';

const Display = ({ value }) => {
  return (
    <div className="display">
      {/* Add data-testid here */}
      <div className="display-value" data-testid="calculator-display">{value}</div>
    </div>
  );
};

export default Display;
