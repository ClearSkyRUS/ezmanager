const InitState = {
	items: null,
	programs: null,
	clients: null
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_ORDERS':
			console.log(action.payload)
			return {
				items: action.payload.orders.reverse(),
				programs: action.payload.programs,
				clients: action.payload.clients
			};
		case 'REMOVE_ORDER':
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			};
		case 'ADD_ORDER':
			return {
				...state,
				items: [ action.payload, ...state.items]
			};
		case 'CHANGE_ORDER':
			return {
				...state, 
			        items: state.items.map(item => {
			            if (item._id === action.payload._id) {
			               return action.payload;
			            }

			            return item;
			        }),
			};
		default:
			return state;
	}
};