import { connect } from 'react-redux';
import * as screenResize  from 'actions/windowUser';
import * as sideBarActions from 'actions/windowUser';
import { bindActionCreators } from 'redux';
import App from 'components/App';

const mapStateToProps = ({ windowUser }) => ({
  desctop: windowUser.desctop,
  visibleSidebar: windowUser.visibleSidebar,
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(screenResize, dispatch),
  	...bindActionCreators(sideBarActions, dispatch)
});	

export default connect(mapStateToProps, mapDispatchToProps)(App);