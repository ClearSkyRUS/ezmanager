const InitState = {
	items: null,
};

export default (state = InitState, action) => {
	switch (action.type) {
		case 'SET_CLIENTS':
			return {
				items: action.payload
			};
		default:
			return state;
	}
} ;