import DaysPage from 'components/pages/DaysPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DaysActions from 'actions/days';
import DishsActions from 'actions/dishs';

class DayListContainer extends React.Component {
	render() {
		const { days, dishs } = this.props;
		if (!days) {
			const { fetchDays } = this.props;
			fetchDays();
		}
		if (!dishs) {
			const { fetchDishs } = this.props;
			fetchDishs();
		}
		return <DaysPage {...this.props} />
	}
};



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
  ...bindActionCreators(DaysActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DayListContainer);