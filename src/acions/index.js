export const addStepMove = (row, column) => {
  return {
    type: 'ADD_STEP_MOVE',
    payload: {
      row,
      column
    }
  };
};

export const clickSquare = (row, column) => async (dispatch, getState) => {
  const { moveStep } = getState().step;
  dispatch({ type: 'CLICK_SQUARE', payload: { row, column, moveStep } });
};

export const changeTurn = () => {
  return {
    type: 'CHANGE_TURN'
  };
};

export const updateWinnerUI = squares => {
  return {
    type: 'UPDATE_WINNER_UI',
    payload: squares
  };
};

export const moveToStep = step => {
  return {
    type: 'MOVE_TO_STEP',
    payload: step
  };
};

export const changeOrderStep = () => {
  return {
    type: 'CHANGE_ORDER_STEP'
  };
};

export const restartCaro = () => {
  return {
    type: 'RESTART_CARO'
  };
};

export const checkWinner = (row, column) => {
  return {
    type: 'SELECT_SQUARE',
    payload: {
      row,
      column
    }
  };
};

export const openWinnerModal = () => {
  return {
    type: 'OPEN_MODAL'
  };
};
export const closeWinnerModal = () => {
  return {
    type: 'CLOSE_MODAL'
  };
};
