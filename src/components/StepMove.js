import React from 'react';

const StepMove = props => {
  const { history, isIncrease, moveStepLocation, moveStep, moveToStep } = props;
  const { length } = history;
  return history.map((val, move) => {
    const step = isIncrease ? move : length - move - 1;
    const location = moveStepLocation[step];
    const desc = step
      ? `Go to move #${step} (${location})`
      : 'Go to game start';
    return (
      <li key={`step${step}`}>
        <button
          type="button"
          className={`btn btn-step ${step === moveStep ? 'current' : ''}`}
          onClick={() => moveToStep(step)}
        >
          {desc}
        </button>
      </li>
    );
  });
};

export default StepMove;
