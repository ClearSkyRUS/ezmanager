const InitState = {
	filterBy: 'Все',
	serchQuery: ''
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return {
				...state,
				filterBy: action.payload
			};
		case 'SET_SERCH_QURY':
			return {
				...state,
				serchQuery: action.payload
			};
		case 'CHANGE_MENU':
            return {
            	...state,
                filterBy: 'Все',
				serchQuery: ''
            };
		default:
			return state;
	}
} ;