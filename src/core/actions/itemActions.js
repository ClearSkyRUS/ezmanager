const itemActions =	{
		"products": {
			"set": "SET_PRODUCTS",
			"remove": "REMOVE_PRODUCT",
			"add": "ADD_PRODUCT",
			"up": "CHANGE_PRODUCT"
		},
		"dishTypes": {
			"set": "SET_DISHTYPES",
			"remove": "REMOVE_DISHTYPE",
			"add": "ADD_DISHTYPE",
			"up": "CHANGE_DISHTYPE"
		},
		"dishs": {
			"set": "SET_DISHS",
			"remove": "REMOVE_DISH",
			"add": "ADD_DISH",
			"up": "CHANGE_DISH"
		},
		"days": {
			"set": "SET_DAYS",
			"remove": "REMOVE_DAY",
			"add": "ADD_DAY",
			"up": "CHANGE_DAY"
		},
		"daysquery": {
			"set": "SET_DAYSQUERYS",
			"remove": "REMOVE_DAYSQUERY",
			"add": "ADD_DAYSQUERY",
			"up": "CHANGE_DAYSQUERY"
		},
		"programs" : {
			"set": "SET_PROGRAMS",
			"remove": "REMOVE_PROGRAM",
			"add": "ADD_PROGRAM",
			"up": "CHANGE_PROGRAM"
		},
		"clients" : {
			"set": "SET_CLIENTS",
			"remove": "REMOVE_CLIENT",
			"add": "ADD_CLIENT",
			"up": "CHANGE_CLIENT"
		},
		"orders" : {
			"set": "SET_ORDERS",
			"remove": "REMOVE_ORDER",
			"add": "ADD_ORDER",
			"up": "CHANGE_ORDER"
		}
	}

const getAction = (path, type) => {
    return itemActions[path][type];
}

export default getAction;