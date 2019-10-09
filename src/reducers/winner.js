const INITIAL_CARO = {
  isWinner: false,
  winnerSquares: []
};

const winner = (state = INITIAL_CARO, action) => {
  switch (action.type) {
    case 'UPDATE_WINNER_UI':
      return { ...state, isWinner: true, winnerSquares: action.payload };

    case 'RESTART_CARO':
      return INITIAL_CARO;

    default:
      return state;
  }
};

export default winner;
