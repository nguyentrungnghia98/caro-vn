import React from 'react';
import StepMoveContainer from '../containers/StepMoveContainer';

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.stepMove = React.createRef();
  }

  scrollToBottom() {
    this.stepMove.scrollTop =
      this.stepMove.scrollHeight - this.stepMove.clientHeight;
  }

  scrollToTop() {
    this.stepMove.scrollTop = 0;
  }

  render() {
    const { changeOrderStep } = this.props;
    return (
      <div className="step-move-container">
        <button
          type="button"
          className="btn btn-change"
          onClick={changeOrderStep}
        >
          Change order
        </button>
        <ul
          className="step-move"
          // eslint-disable-next-line no-return-assign
          ref={ref => (this.stepMove = ref)}
        >
          <StepMoveContainer />
        </ul>
      </div>
    );
  }
}

export default Step;
