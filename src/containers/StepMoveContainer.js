import { connect } from 'react-redux';
import StepMove from '../components/StepMove';
import { moveToStep } from '../acions';

const mapStateToProps = state => {
  const { history } = state.caro;
  const { moveStep, moveStepLocation, isIncrease } = state.step;
  return {
    history,
    moveStep,
    moveStepLocation,
    isIncrease
  };
};

export default connect(
  mapStateToProps,
  {
    moveToStep
  }
)(StepMove);
