import React from "react";

class Square extends React.Component {
  render() {
    let img = null;
    if(this.props.value) img = this.props.value === 'X'?'times-icon':'circle-icon';
    return (
      <button className="square" onClick={this.props.onClick} disabled={this.props.disabled}>
        {img && 
          <div className="image-container">
            <img alt="" src={`./images/${img}.png`}/>
          </div>
        }
      </button>
    );
  }
}

export default Square;