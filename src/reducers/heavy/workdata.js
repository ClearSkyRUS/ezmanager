const InitState = {
	data: null,
	dayscount: 1
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_WORK_DATA':
			return {
				...state, 
				data: action.payload
			};
		case 'SET_CHECKED_PRODUCT':
			action.payload.gramhave = action.payload.gramneed;
			return {
				...state, 
			        items: state.data.BuyList.products.map(item => {
			            if (item.title === action.payload.title) {
			               return action.payload;
			            }
			            return item;
			        }),
			};
		case 'SET_DAYS_COUNT':
			return {
				...state, 
			        dayscount: action.payload
			};
		default:
			return state;
	}
} ;