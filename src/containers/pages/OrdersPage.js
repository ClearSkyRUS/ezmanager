import OrdersPage from '../../components/pages/OrdersPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setOrders  from '../../actions/orders';
import * as setClients  from '../../actions/clients';

const mapStateToProps = ({ orders, clients, filter}) => ({
  	orders: orders.items,
  	clients: clients.items,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(setOrders, dispatch),
   ...bindActionCreators(setClients, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);