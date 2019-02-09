import ProductsPage from '../../components/pages/ProductsPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setProducts  from '../../actions/products';

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
  ...bindActionCreators(setProducts, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);