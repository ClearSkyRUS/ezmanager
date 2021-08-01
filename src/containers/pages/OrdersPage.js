import OrdersPage from 'components/pages/OrdersPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'orders';

class OrdersListContainer extends React.Component {
	render() {
		const { orders } = this.props;
		if (!orders){
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <OrdersPage {...this.props} />
	}
}


const mapStateToProps = ({ orders}) => ({
  	orders: orders.items,
  	clients: orders.clients,
  	programs: orders.programs,
  	ApiPath: ApiPath
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListContainer);