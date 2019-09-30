import React from 'react';
import Drawer from 'react-drag-drawer';

const PopUp = props =>{
    const {toggle, onToggle, onRestart, winner} = props;

    return (
      <Drawer
        open={toggle}
        onRequestClose={onToggle}
        modalElementClass="modal"
      >
        <button type="button" className="btn btn-close" onClick={onToggle}>
          <div>x</div>
        </button>
        <div className="card">
          <h3>Winner!</h3>
          <div className="symbol">
            {winner}
          </div>
          <button type="button" className="btn btn-restart" onClick={onRestart}>
            Restart
          </button>
        </div>
      </Drawer>
    );
}


export default PopUp;