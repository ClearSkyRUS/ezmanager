import DishsPage from 'components/pages/DishsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'dishs';

class DishsListContainer extends React.Component {
	render() {
		const { dishs } = this.props;
		if (!dishs) {
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <DishsPage {...this.props} />
	}

}


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
		o.title.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0,
	);
}

const mapStateToProps = ({ dishs, filter }) => ({
	dishs: dishs.items && sortBy(dishs.items, filter ),
	products: dishs.products,
	types: dishs.types,
	ApiPath: ApiPath
});


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DishsListContainer);