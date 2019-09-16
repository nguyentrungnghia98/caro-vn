import React from 'react';
import Drawer from 'react-drag-drawer'


class PopUp extends React.Component{
  render () {
    return (
      <Drawer
        open={this.props.toggle}
        onRequestClose={this.props.onToggle}
        modalElementClass="modal"
      >
        <button className="btn btn-close" onClick={this.props.onToggle}>
          <div>x</div>
        </button>
        <div className="card">
          <h3>Winner!</h3>
          <div className="symbol">
            {this.props.winner}
          </div>
          <button className="btn btn-restart" onClick={this.props.onRestart}>
            Restart
          </button>
        </div>
      </Drawer>
    )
  }
}


export default PopUp;