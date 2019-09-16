import React from "react";
import Square from "./Square";
import PopUp from './Pop-up'

class Board extends React.Component {
  length = 20
  size = new Array(this.length).fill(0);
  state = {
    squares: Array(this.length).fill(0).map(el => Array(this.length).fill(0)),
    toggle: false,
    isWinner:false,
    turn: true
  }
  checkWinner(row, column){
    let countRow = 0, countColumn = 0;
    let squares = this.state.squares.slice();
    let currentSelect = squares[row][column];
    let inverseSelect = currentSelect === 'X'?'O':'X'
    //check current Row and Column
    for(let i = 0; i < this.length; i++){
      countRow = squares[row][i] === currentSelect? countRow + 1: 0;
      if(countRow === 5){
        if(squares[row][i+1] === inverseSelect && squares[row][i-5] === inverseSelect){
          countRow = 0;
        }else{
          this.setState({isWinner: true, toggle: true});
        }
        return;
      }

      countColumn = squares[i][column] === currentSelect? countColumn + 1: 0;
      if(countColumn === 5){
        if(squares[i+1][column] === inverseSelect && squares[i-5][column] === inverseSelect){
          countColumn = 0;
        }else{
          this.setState({isWinner: true, toggle: true});
          return;
        }
      }
    }
    //check diagonal right and left
    let countRight = 0, countLeft = 0;
    let l = Math.ceil(Math.sqrt(2)*this.length);
    for(let i = 0; i <= l; i++){
      let rRow = this.length - 1 - i, rColumn = column - (this.length - row - 1) + i;
      if(squares[rRow] !== undefined && squares[rRow][rColumn] !== undefined){
        countRight = squares[rRow][rColumn] === currentSelect? countRight + 1: 0;
        if(countRight === 5){
          if(squares[rRow-1][rColumn+1] === inverseSelect && squares[rRow+5][rColumn-5] === inverseSelect){
            countRight = 0;
          }else{
            this.setState({isWinner: true, toggle: true});
            return;
          }
        }
      }
      //diagonal left
      let lRow = i, lColumn = column - row + i;
      if(squares[lRow] !== undefined && squares[lRow][lColumn] !== undefined){
        countLeft = squares[lRow][lColumn] === currentSelect? countLeft + 1: 0;
        if(countLeft === 5){
          if(squares[lRow+1][lColumn+1] === inverseSelect && squares[lRow-5][lColumn-5] === inverseSelect){
            countLeft = 0;
          }else{
            this.setState({isWinner: true, toggle: true});
            return;
          }
        }
      }
    }
    this.onChangeTurn();
  }

  handleClick(i,j){
    if(this.state.squares[i][j] !== 0) return 

    const squares = this.state.squares.slice()
    squares[i][j] = this.state.turn? 'X':'O';
    this.setState({
      squares,
    })
    this.checkWinner(i, j);
  }
  renderRow(i) {
    return this.size.map((el, j) => {
      let value = this.state.squares[i][j]? this.state.squares[i][j]: null;
      return (
        <Square value={value} onClick={this.handleClick.bind(this, i, j)} key={'square-'+i*this.length+j} disabled={this.state.isWinner}/>
      )
    })
  }
  renderBoard(){
    return (
      this.size.map((el, i) => {
        return (
          <div className="board--row" key={'row-'+i}>
            {this.renderRow(i)}
          </div>
        )
      })
    )
  }
  toggle = (type, value) => event => {
    this.setState(state => {
      return {
        [type]: value
      };
    });
  };

  onRestart = () => {
    this.setState({
      squares: Array(this.length).fill(0).map(el => Array(this.length).fill(0)),
      toggle: false,
      isWinner: false
    })
    if(!this.state.turn) this.onChangeTurn();
  }

  onChangeTurn() {
    console.log("onChangeTurn")
    this.setState({
      turn: !this.state.turn
    })
  }

  render() {
    let winner = this.state.turn? 'X':'O';
    return (
      <React.Fragment>
        <button className="btn btn-restart custom-location" onClick={this.onRestart}>
              Restart
        </button>
        <div className="turn">
          {this.state.turn &&
            <h2 className="turn-animation">
              {winner === 'X' && this.state.isWinner? 'You win': 'Your turn' }
            </h2>
          }
          <div className="symbol">
            X
          </div>
        </div>

        <div className="board">

          <PopUp toggle={this.state.toggle} onRestart={this.onRestart} onToggle={this.toggle("toggle", false)} winner={winner}/>
          
          {this.renderBoard()}
        </div>

        <div className="turn">
          {!this.state.turn &&
            <h2 className="turn-animation">
              {winner === 'O' && this.state.isWinner? 'You win': 'Your turn' }
            </h2>
          }
          <div className="symbol">
            O
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Board;