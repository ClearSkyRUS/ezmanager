import ProductsPage from 'components/pages/ProductsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductsActions  from 'actions/products';

class ProductsListContainer extends React.Component {
	render() {
		const { products } = this.props;
		if (!products) {
			const { fetchProducts } = this.props;
			fetchProducts();
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
  	allProducts: products.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ProductsActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductsListContainer);