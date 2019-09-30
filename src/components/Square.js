import React from 'react';
import PropTypes from 'prop-types';

class Square extends React.Component {
  render() {
    let img = null;
    if(this.props.value) {img = this.props.value === 'X'?'times-icon':'circle-icon';}
    return (
      <button className={`square ${  this.props.isHighLight? 'highlight':''}`} onClick={this.props.onClick} disabled={this.props.disabled}>
        {img && 
          <div className="image-container">
            <img alt="" src={`./images/${img}.png`}/>
          </div>
        }
      </button>
    );
  }
}

Square.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  isHighLight: PropTypes.bool
};

export default Square;