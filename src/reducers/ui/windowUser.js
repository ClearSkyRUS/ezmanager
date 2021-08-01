const initialState = {
	desctop: window.innerWidth>600,
	visibleSidebar: window.innerWidth>600,
	menuPosition: document.location.pathname,
    CheckChosen: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        	case 'SCREEN_RESIZE':
            return {
            	...state,
                desctop: action.payload,
            };
            case 'VISBLE_SIDEBAR':
            return {
            	...state,
                visibleSidebar: action.payload,
            };
             case 'CHANGE_MENU':
            return {
            	...state,
                menuPosition: action.payload,
                visibleSidebar: false
            };
    	default:
   		 return state;
   		}
};