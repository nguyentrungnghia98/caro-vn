import React from 'react';
import Drawer from 'react-drag-drawer';
import { connect } from 'react-redux';
import { restartCaro, closeWinnerModal } from '../acions';

const WinnerPopUp = props => {
  // console.log('modal props',props);

  const { toggle, onCloseModal, onRestart, winner } = props;

  function restart() {
    onRestart();
    onCloseModal();
  }

  return (
    <Drawer
      open={toggle}
      onRequestClose={closeWinnerModal}
      modalElementClass="modal"
    >
      <button type="button" className="btn btn-close" onClick={onCloseModal}>
        <div>x</div>
      </button>
      <div className="card">
        <h3>Winner!</h3>
        <div className="symbol">{winner}</div>
        <button type="button" className="btn btn-restart" onClick={restart}>
          Restart
        </button>
      </div>
    </Drawer>
  );
};

const mapStateToProps = state => {
  return {
    toggle: state.winnerModal,
    winner: state.caro.turn ? 'X' : 'O'
  };
};

export default connect(
  mapStateToProps,
  {
    onCloseModal: closeWinnerModal,
    onRestart: restartCaro
  }
)(WinnerPopUp);
