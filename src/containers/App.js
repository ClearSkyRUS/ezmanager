import { connect } from 'react-redux';
import { screenResize } from '../actions/windowUser';
import App from '../components/App';

const mapStateToProps = ({ windowUser }) => ({
  desctop: windowUser.desctop,
  visibleSidebar: windowUser.visibleSidebar,
});

const mapDispatchToProps = dispatch => ({
  screenResize: windowUser => dispatch(screenResize(windowUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);