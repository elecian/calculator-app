import React from 'react';

const Button = ({ onClick, className, value }) => {
  return (
    <button
      className={`button ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;
