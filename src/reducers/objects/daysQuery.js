const InitState = {
	items: null
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_DAYSQUERYS':
			console.log(action.payload)
			return {
				items: action.payload
			};  
		case 'REMOVE_DAYSQUERY':
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			};
		case 'ADD_DAYSQUERY':
			if (action.payload.type === 'Другой')
				action.payload.type = action.payload.otherType;
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case 'CHANGE_DAYSQUERY':
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
} ;