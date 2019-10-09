import { combineReducers } from 'redux';
import caro from './caro';
import winner from './winner';
import winnerModal from './winnerModal';
import step from './step';

export default combineReducers({
  caro,
  winner,
  winnerModal,
  step
});
