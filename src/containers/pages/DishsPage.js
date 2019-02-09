import DishsPage from '../../components/pages/DishsPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductsActions  from '../../actions/products';
import * as DishsActions  from '../../actions/dishs';

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

export default connect(mapStateToProps, mapDispatchToProps)(DishsPage);