const InitState = {
	items: null,
	dishs: null
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_DAYS':
			console.log(action.payload)
			return {
				items: action.payload.days,
				dishs: action.payload.dishs
			};
		case 'REMOVE_DAY':
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			};
		case 'ADD_DAY':
			if (action.payload.type === 'Другой')
				action.payload.type = action.payload.otherType;
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case 'CHANGE_DAY':
			if (action.payload.type === 'Другой')
				action.payload.type = action.payload.otherType;
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