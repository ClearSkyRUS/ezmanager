import mSideBar from '../components/menu/sideBar'
import * as sideBarActions from '../actions/windowUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = ({ windowUser }) => ({
	desctop: windowUser.desctop,
	visibleSidebar: windowUser.visibleSidebar,
	menuState: windowUser.menuPosition
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(sideBarActions, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(mSideBar);