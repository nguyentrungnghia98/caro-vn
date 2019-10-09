import { connect } from 'react-redux';
import Step from '../components/Step';
import { changeOrderStep } from '../acions';

export default connect(
  null,
  {
    changeOrderStep
  },
  null,
  { forwardRef: true }
)(Step);
