import OrdersPage from 'components/pages/OrdersPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionsOrders  from 'actions/orders';
import actionsClients  from 'actions/clients';
import actionsPrograms  from 'actions/programs';

class OrdersListContainer extends React.Component {
	render() {
		const { programs, orders, clients } = this.props;
		if (!programs){
			const { fetchPrograms } = this.props;
			fetchPrograms();
		}
		if (!orders) {
			const { fetchOrders } = this.props;
			fetchOrders();
		}
		if (!clients) {
			const { fetchClients } = this.props;
			fetchClients();
		}
		return <OrdersPage {...this.props} />
	}

}


const mapStateToProps = ({ orders, clients, programs}) => ({
  	orders: orders.items,
  	clients: clients.items,
  	programs: programs.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actionsOrders, dispatch),
   ...bindActionCreators(actionsClients, dispatch),
   ...bindActionCreators(actionsPrograms, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListContainer);