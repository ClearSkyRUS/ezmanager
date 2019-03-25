import Filter from 'components/filter/filter'

import { bindActionCreators } from 'redux';
import * as setFilter from 'actions/filter';
import { connect } from 'react-redux';


const mapStateToProps = ({ products, filter }) => ({
  filterBy: filter.filterBy
});

const mapDispatchToProps = dispatch => ({
	...bindActionCreators(setFilter, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Filter);