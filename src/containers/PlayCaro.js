import { connect } from 'react-redux';
import Board from '../components/Board';
import {
  clickSquare,
  changeTurn,
  updateWinnerUI,
  restartCaro,
  openWinnerModal
} from '../acions';

const mapStateToProps = state => {
  const { history, turn } = state.caro;
  const { isWinner, winnerSquares } = state.winner;
  const { moveStep, isIncrease } = state.step;
  return {
    history,
    moveStep,
    turn,
    isWinner,
    winnerSquares,
    isIncrease
  };
};

export default connect(
  mapStateToProps,
  {
    clickSquare,
    changeTurn,
    updateWinnerUI,
    restartCaro,
    openWinnerModal
  }
)(Board);
