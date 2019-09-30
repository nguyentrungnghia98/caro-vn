import React from 'react';

const Square = props => {
  const { value, isHighLight, onClick, disabled } = props;
  let img = null;
  if (value) {
    img = value === 'X' ? 'times-icon' : 'circle-icon';
  }
  return (
    <button
      type="button"
      className={`square ${isHighLight ? 'highlight' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {img && (
        <div className="image-container">
          <img alt="" src={`./images/${img}.png`} />
        </div>
      )}
    </button>
  );
};

export default Square;
