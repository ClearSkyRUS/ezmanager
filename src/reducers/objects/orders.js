const InitState = {
	items: null,
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_ORDERS':
			return {
				items: action.payload.reverse()
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