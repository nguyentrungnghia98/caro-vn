import React from 'react';
import shortid from 'shortid';
import Square from './Square';
import PopUp from './Pop-up';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.length = 20;
    this.size = new Array(this.length).fill(0);
    this.state = {
      history: [
        {
          squares: Array(this.length)
            .fill(0)
            .map(() => Array(this.length).fill(0))
        }
      ],
      moveStepLocation: {},
      moveStep: 0,
      toggle: false,
      isWinner: false,
      winnerSquares: [],
      turn: true,
      isIncrease: true
    };
  }

  onChangeOrder = () => {
    this.setState(state => {
      return {
        isIncrease: !state.isIncrease
      };
    });
  };

  onRestart = () => {
    const { turn } = this.state;
    this.setState({
      history: [
        {
          squares: Array(this.length)
            .fill(0)
            .map(() => Array(this.length).fill(0))
        }
      ],
      toggle: false,
      isWinner: false,
      winnerSquares: [],
      moveStepLocation: {},
      moveStep: 0
    });

    if (!turn) {
      this.onChangeTurn();
    }
  };

  onChangeTurn() {
    this.setState(state => {
      return {
        turn: !state.turn
      };
    });
  }

  toggle = (type, value) => {
    this.setState({
      [type]: value
    });
  };

  scrollToBottom() {
    this.stepMoveEl.scrollTop =
      this.stepMoveEl.scrollHeight - this.stepMoveEl.clientHeight;
  }

  scrollToTop() {
    this.stepMoveEl.scrollTop = 0;
  }

  moveToStep(step) {
    this.setState({
      moveStep: step,
      turn: step % 2 === 0
    });
  }

  checkWinner(row, column, squares) {
    let countRow = 0;
    let countColumn = 0;
    const currentSelect = squares[row][column];
    const inverseSelect = currentSelect === 'X' ? 'O' : 'X';
    let winnerSquares1 = [];
    let winnerSquares2 = [];
    // check current Row and Column
    for (let i = 0; i < this.length; i += 1) {
      if (squares[row][i] === currentSelect) {
        countRow += 1;
        winnerSquares1.push({ i: row, j: i });
      } else {
        countRow = 0;
        winnerSquares1 = [];
      }
      if (countRow === 5) {
        if (
          squares[row][i + 1] === inverseSelect &&
          squares[row][i - 5] === inverseSelect
        ) {
          countRow = 0;
        } else {
          this.setState({
            isWinner: true,
            toggle: true,
            winnerSquares: winnerSquares1
          });
        }
        return;
      }

      if (squares[i][column] === currentSelect) {
        countColumn += 1;
        winnerSquares2.push({ i, j: column });
      } else {
        countColumn = 0;
        winnerSquares2 = [];
      }
      if (countColumn === 5) {
        if (
          squares[i + 1][column] === inverseSelect &&
          squares[i - 5][column] === inverseSelect
        ) {
          countColumn = 0;
        } else {
          this.setState({
            isWinner: true,
            toggle: true,
            winnerSquares: winnerSquares2
          });
          return;
        }
      }
    }
    // check diagonal right and left
    let countRight = 0;
    let countLeft = 0;
    winnerSquares1 = [];
    winnerSquares2 = [];
    const l = Math.ceil(Math.sqrt(2) * this.length);
    for (let i = 0; i <= l; i += 1) {
      const rRow = this.length - 1 - i;
      const rColumn = column - (this.length - row - 1) + i;
      if (squares[rRow] !== undefined && squares[rRow][rColumn] !== undefined) {
        if (squares[rRow][rColumn] === currentSelect) {
          countRight += 1;
          winnerSquares1.push({ i: rRow, j: rColumn });
        } else {
          countRight = 0;
          winnerSquares1 = [];
        }
        if (countRight === 5) {
          if (
            squares[rRow - 1][rColumn + 1] === inverseSelect &&
            squares[rRow + 5][rColumn - 5] === inverseSelect
          ) {
            countRight = 0;
          } else {
            this.setState({
              isWinner: true,
              toggle: true,
              winnerSquares: winnerSquares1
            });
            return;
          }
        }
      }
      // diagonal left
      const lRow = i;
      const lColumn = column - row + i;
      if (squares[lRow] !== undefined && squares[lRow][lColumn] !== undefined) {
        if (squares[lRow][lColumn] === currentSelect) {
          countLeft += 1;
          winnerSquares2.push({ i: lRow, j: lColumn });
        } else {
          countLeft = 0;
          winnerSquares2 = [];
        }
        if (countLeft === 5) {
          if (
            squares[lRow + 1][lColumn + 1] === inverseSelect &&
            squares[lRow - 5][lColumn - 5] === inverseSelect
          ) {
            countLeft = 0;
          } else {
            this.setState({
              isWinner: true,
              toggle: true,
              winnerSquares: winnerSquares2
            });
            return;
          }
        }
      }
    }
    this.onChangeTurn();
  }

  handleClick(i, j) {
    const { history: fullHistory, moveStep, turn, isIncrease } = this.state;
    const history = fullHistory.slice(0, moveStep + 1);
    const { moveStepLocation } = this.state;
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));

    if (squares[i][j] !== 0) {
      return;
    }

    squares[i][j] = turn ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      moveStep: history.length,
      moveStepLocation: { ...moveStepLocation, [history.length]: `${i}, ${j}` }
    });
    this.checkWinner(i, j, squares);
    // scroll down
    setTimeout(() => {
      if (isIncrease) {
        this.scrollToBottom();
      } else {
        this.scrollToTop();
      }
    }, 300);
  }

  renderRow(squares, i) {
    const { isWinner, winnerSquares } = this.state;
    return this.size.map((el, j) => {
      const value = squares[i][j] ? squares[i][j] : null;
      let isHighLight = false;
      if (isWinner) {
        isHighLight = winnerSquares.some(loc => loc.i === i && loc.j === j);
      }
      return (
        <Square
          isHighLight={isHighLight}
          value={value}
          onClick={() => this.handleClick(i, j)}
          key={`square-${shortid.generate()}`}
          disabled={isWinner}
        />
      );
    });
  }

  renderBoard(squares) {
    return this.size.map((el, i) => {
      return (
        <div className="board--row" key={`row-${shortid.generate()}`}>
          {this.renderRow(squares, i)}
        </div>
      );
    });
  }

  renderLeftSide(winner) {
    const { turn, isWinner } = this.state;
    return (
      <div className="turn turn-left">
        {turn && (
          <h2 className="turn-animation">
            {winner === 'X' && isWinner ? 'You win' : 'Your turn'}
          </h2>
        )}
        <div className="symbol">X</div>
      </div>
    );
  }

  renderRightSide(winner) {
    const { turn, isWinner } = this.state;
    return (
      <div className="turn turn-right">
        {!turn && (
          <h2 className="turn-animation">
            {winner === 'O' && isWinner ? 'You win' : 'Your turn'}
          </h2>
        )}
        <div className="symbol">O</div>
      </div>
    );
  }

  renderMoveStep(history) {
    const { isIncrease, moveStepLocation, moveStep } = this.state;
    const { length } = history;

    return history.map((val, move) => {
      const step = isIncrease ? move : length - move - 1;
      const location = moveStepLocation[step];
      const desc = step
        ? `Go to move #${step} (${location})`
        : 'Go to game start';
      return (
        <li key={`step${step}`}>
          <button
            type="button"
            className={`btn btn-step ${step === moveStep ? 'current' : ''}`}
            onClick={() => this.moveToStep(step)}
          >
            {desc}
          </button>
        </li>
      );
    });
  }

  render() {
    const { turn, toggle } = this.state;
    const winner = turn ? 'X' : 'O';
    const { history, moveStep } = this.state;
    const current = history[moveStep];
    const squares = current.squares.slice();
    return (
      <>
        <button
          type="button"
          className="btn btn-restart custom-location"
          onClick={this.onRestart}
        >
          Restart
        </button>

        {this.renderLeftSide(winner)}
        <div className="board">
          <PopUp
            toggle={toggle}
            onRestart={this.onRestart}
            onToggle={() => this.toggle('toggle', false)}
            winner={winner}
          />
          {this.renderBoard(squares)}
        </div>
        {this.renderRightSide(winner)}

        <div className="step-move-container">
          <button
            type="button"
            className="btn btn-change"
            onClick={this.onChangeOrder}
          >
            Change order
          </button>
          <ul
            className="step-move"
            ref={el => {
              this.stepMoveEl = el;
            }}
          >
            {this.renderMoveStep(history)}
          </ul>
        </div>
      </>
    );
  }
}

export default Board;
