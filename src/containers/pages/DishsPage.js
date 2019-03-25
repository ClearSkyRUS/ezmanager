import DishsPage from 'components/pages/DishsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DishsActions  from 'actions/dishs';
import ProductsActions  from 'actions/products';

class DishsListContainer extends React.Component {
	render() {
		const { products, dishs } = this.props;
		if (!products) {
			const { fetchProducts } = this.props;
			fetchProducts();
		}
		if (!dishs) {
			const { fetchDishs } = this.props;
			fetchDishs();
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

const mapStateToProps = ({ dishs, products, filter }) => ({
	dishs: dishs.items && sortBy(dishs.items, filter ),
  	allDishs: dishs.items,
  	products: products.items
});


const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(DishsActions, dispatch),
  ...bindActionCreators(ProductsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DishsListContainer);