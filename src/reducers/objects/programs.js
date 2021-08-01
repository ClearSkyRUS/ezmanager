const InitState = {
	items: null,
	settings: null
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_PROGRAMS':
			console.log(action.payload)
			return {
				items: action.payload.programs,
				settings: action.payload.settings
			};
		case 'REMOVE_PROGRAM':
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			};
		case 'ADD_PROGRAM':
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case 'CHANGE_PROGRAM':
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