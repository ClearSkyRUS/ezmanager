import DaysPage from '../../components/pages/DaysPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setDays from '../../actions/days';
import * as DishsActions from '../../actions/dishs';

const sortBy = (items, filter) => {
	if(filter.filterBy === 'Все')
		return sortBySerch(items, filter);

	return sortBySerch(items, filter).filter(
	o => 
		o.type === filter.filterBy
	);
}

const sortBySerch = (items, filter) => {
	return items.filter(
	o => 
		o.type.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0,
	);
}

const mapStateToProps = ({ dishs, days, filter }) => ({
	days: days.items && sortBy(days.items, filter ),
  	allDays: days.items,
  	dishs: dishs.items
});


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(DishsActions, dispatch),
  ...bindActionCreators(setDays, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DaysPage);