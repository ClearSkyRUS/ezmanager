import { OrdersApi } from 'utils/api'


const OrderActions = {
	setOrders: (items) => ({
		type: 'SET_ORDERS',
	payload:items
	}),
	removeOrder: (id) => ({
		type: 'REMOVE_ORDER',
		payload: id
	}),
	addOrder: (item) => ({
		type: 'ADD_ORDER',
		payload: item
	}),
	upOrder: (item) => ({
		type: 'CHANGE_ORDER',
		payload: item
	}),
	fetchAddOrder: item => dispatch => {
		dispatch(OrderActions.addOrder(item));
    	OrdersApi.add(item);
    },
    fetchUpOrder: (item, newStatus) => dispatch => {
    	if (newStatus)
    		item.status = newStatus
		dispatch(OrderActions.upOrder(item));
    	OrdersApi.up(item);
    },
	fetchRemoveOrder: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(OrderActions.removeOrder(id));
	      	OrdersApi.remove(id);
	    }
  	},
  	fetchOrders: () => dispatch => {
    	OrdersApi.get().then(({ data }) => {
      		dispatch(OrderActions.setOrders(data));
    	});
  	},
};

export default OrderActions;