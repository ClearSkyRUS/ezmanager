import ProductsPage from 'components/pages/ProductsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';
const ApiPath = 'products';


class ProductsListContainer extends React.Component {
	render() {
		const { products } = this.props;
		if (!products) {
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <ProductsPage {...this.props} />
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

const mapStateToProps = ({ products, filter }) => ({
	products: products.items && sortBy(products.items, filter ),
  	allProducts: products.items,
  	ApiPath: ApiPath
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);