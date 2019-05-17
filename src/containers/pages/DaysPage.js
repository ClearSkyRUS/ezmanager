import DaysPage from 'components/pages/DaysPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'days';

class DayListContainer extends React.Component {
	render() {
		const { days } = this.props;
		if (!days) {
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <DaysPage {...this.props} />
	}
};



const sortBy = (items, filter) => {
	if(filter.filterBy === 'Все')
		return sortBySerch(items, filter);

	return sortBySerch(items, filter);
}

const sortBySerch = (items, filter) => {
	return items.filter(
	o => 
		o.title.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0,
	);
}

const mapStateToProps = ({ dishs, days, filter }) => ({
	days: days.items,
  	dishs: days.dishs && sortBy(days.dishs, filter),
  	ApiPath: ApiPath
});

 
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DayListContainer);