import React from 'react';
import Square from './Square';
import PopUp from './Pop-up';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.length = 20;
    this.size = new Array(this.length).fill(0);
    this.state = {
      history: [{
        squares: Array(this.length).fill(0).map(() => Array(this.length).fill(0)),
      }],
      moveStepLocation: {},
      moveStep: 0,
      toggle: false,
      isWinner: false,
      winnerSquares: [],
      turn: true
    };
  }
  checkWinner(row, column, squares) {
    let countRow = 0,
      countColumn = 0;
    let currentSelect = squares[row][column];
    let inverseSelect = currentSelect === 'X' ? 'O' : 'X';
    let winnerSquares1 = [];
    let winnerSquares2 = [];
    //check current Row and Column
    for (let i = 0; i < this.length; i++) {
      if(squares[row][i] === currentSelect){
        countRow += 1;
        winnerSquares1.push({i: row, j: i});
      }else{
        countRow = 0;
        winnerSquares1 = [];
      }
      if (countRow === 5) {
        if (squares[row][i + 1] === inverseSelect && squares[row][i - 5] === inverseSelect) {
          countRow = 0;
        } else {
          this.setState({ isWinner: true, toggle: true, winnerSquares: winnerSquares1 });
        }
        return;
      }

      if(squares[i][column] === currentSelect){
        countColumn += 1;
        winnerSquares2.push({i: i, j: column});
      }else{
        countColumn = 0;
        winnerSquares2 = [];
      }
      if (countColumn === 5) {
        if (squares[i + 1][column] === inverseSelect && squares[i - 5][column] === inverseSelect) {
          countColumn = 0;
        } else {
          this.setState({ isWinner: true, toggle: true, winnerSquares: winnerSquares2 });
          return;
        }
      }
    }
    //check diagonal right and left
    let countRight = 0,
      countLeft = 0;
    winnerSquares1 = [];
    winnerSquares2 = [];
    let l = Math.ceil(Math.sqrt(2) * this.length);
    for (let i = 0; i <= l; i++) {
      let rRow = this.length - 1 - i,
        rColumn = column - (this.length - row - 1) + i;
      if (squares[rRow] !== undefined && squares[rRow][rColumn] !== undefined) {
        if(squares[rRow][rColumn] === currentSelect){
          countRight += 1;
          winnerSquares1.push({i: rRow, j: rColumn});
        }else{
          countRight = 0;
          winnerSquares1 = [];
        }
        if (countRight === 5) {
          if (squares[rRow - 1][rColumn + 1] === inverseSelect && squares[rRow + 5][rColumn - 5] === inverseSelect) {
            countRight = 0;
          } else {
            this.setState({ isWinner: true, toggle: true, winnerSquares: winnerSquares1 });
            return;
          }
        }
      }
      //diagonal left
      let lRow = i,
        lColumn = column - row + i;
      if (squares[lRow] !== undefined && squares[lRow][lColumn] !== undefined) {
        if(squares[lRow][lColumn] === currentSelect){
          countLeft += 1;
          winnerSquares2.push({i: lRow, j: lColumn});
        }else{
          countLeft = 0;
          winnerSquares2 = [];
        }
        if (countLeft === 5) {
          if (squares[lRow + 1][lColumn + 1] === inverseSelect && squares[lRow - 5][lColumn - 5] === inverseSelect) {
            countLeft = 0;
          } else {
            this.setState({ isWinner: true, toggle: true, winnerSquares: winnerSquares2 });
            return;
          }
        }
      }
    }
    this.onChangeTurn();
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.moveStep + 1);
    const moveStepLocation = this.state.moveStepLocation;
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));
    
    if (squares[i][j] !== 0) { return; }

    squares[i][j] = this.state.turn ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      moveStep: history.length,
      moveStepLocation: {...moveStepLocation,  [history.length]: i + ', ' + j}
    });
    this.checkWinner(i, j, squares);
    //scroll down
    setTimeout(()=>{
      this.scrollToBottom(this.stepMoveEl);
    },300);
  }

  scrollToBottom(element){
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
  toggle = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  onRestart = () => {
    this.setState({
      history: [{ squares: Array(this.length).fill(0).map(() => Array(this.length).fill(0)) }],
      toggle: false,
      isWinner: false,
      winnerSquares: [],
      moveStepLocation: {},
      moveStep: 0,
    });
    if (!this.state.turn) { this.onChangeTurn(); }
  }

  onChangeTurn() {
    console.log('onChangeTurn');
    this.setState({
      turn: !this.state.turn
    });
  }

  moveToStep(step){
    this.setState({
      moveStep: step,
      turn: (step % 2) === 0
    });
  }

  renderRow(squares,i) {
    return this.size.map((el, j) => {
      let value = squares[i][j] ? squares[i][j] : null;
      let isHighLight = false;
      if(this.state.isWinner){
        isHighLight  = this.state.winnerSquares.some(loc => loc.i === i && loc.j === j);
      }
      return (
        <Square isHighLight={isHighLight} value={value} onClick={this.handleClick.bind(this, i, j)} key={'square-' + i * this.length + j} disabled={this.state.isWinner} />
      );
    });
  }
  renderBoard(squares) {
    return (
      this.size.map((el, i) => {
        return (
          <div className="board--row" key={'row-' + i}>
            {this.renderRow(squares,i)}
          </div>
        );
      })
    );
  }
  renderLeftSide(winner) {
    return (
      <div className="turn turn-left">
        {this.state.turn &&
          <h2 className="turn-animation">
            {winner === 'X' && this.state.isWinner ? 'You win' : 'Your turn'}
          </h2>
        }
        <div className="symbol">
          X
        </div>
      </div>
    );
  }
  renderRightSide(winner) {
    return (
      <div className="turn turn-right">
        {!this.state.turn &&
          <h2 className="turn-animation">
            {winner === 'O' && this.state.isWinner ? 'You win' : 'Your turn'}
          </h2>
        }
        <div className="symbol">
          O
        </div>
      </div>
    );
  }
  renderMoveStep(history){
    return history.map((step, move) => {
      const location = this.state.moveStepLocation[move];
      const desc = move? 'Go to move #' + move + ` (${location})`: 'Go to game start';
      return (
        <li key={'step' + move}>
          <button className={'btn btn-step ' + (move === this.state.moveStep? 'current':'')} onClick={this.moveToStep.bind(this, move)}>{desc}</button>
        </li>
      );
    });
  }
  render() {
    
    let winner = this.state.turn ? 'X' : 'O';
    const { history, moveStep } = this.state;
    const current = history[moveStep];
    const squares = current.squares.slice();
    console.log(this.state, current);
    return (
      <React.Fragment>
        <button className="btn btn-restart custom-location" onClick={this.onRestart}>
          Restart
        </button>

        {this.renderLeftSide(winner)}
        <div className="board">
          <PopUp toggle={this.state.toggle} onRestart={this.onRestart} onToggle={this.toggle.bind(this, 'toggle', false)} winner={winner} />
          {this.renderBoard(squares)}
        </div>
        {this.renderRightSide(winner)}

        <ul className="step-move" ref={(el) => { this.stepMoveEl = el; }}>
          {this.renderMoveStep(history)}
        </ul>
      </React.Fragment>
    );
  }
}

export default Board;