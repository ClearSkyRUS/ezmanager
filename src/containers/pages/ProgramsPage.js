import ProgramsPage from '../../components/pages/ProgramsPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setPrograms  from '../../actions/programs';


const mapStateToProps = ({ programs }) => ({
  	programs: programs.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(setPrograms, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);