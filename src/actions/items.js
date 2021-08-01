import { CrmApi } from 'utils/api'
import getAction from 'core/actions/itemActions'

const ItemActions = {
	setItems: (items, action) => ({
		type: action,
		payload: items
	}),
	removeItem: (id, action) => ({
		type: action,
		payload: id
	}),
	addItem: (item, action) => ({
		type: action,
		payload: item
	}),
	upItem: (item, action) => ({
		type: action,
		payload: item
	}),
	fetchAddItem: (path, item) => dispatch => {
    	CrmApi.add(path, item).then(({ data }) => {
    		
    	});
    },
    fetchUpItem: (path, id, data) => dispatch => {
    	console.log(path)
    	CrmApi.up(path, id, data).then(({ data }) => {
      		
    	});
    },
	fetchRemoveItem: (path, id) => dispatch => {
		console.log(path)
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(ItemActions.removeItem(id, getAction(path, 'remove')));
	      	CrmApi.remove(path, id);
	    }
  	},
  	fetchItems: (path) => dispatch => {
    	CrmApi.get(path).then(({ data }) => {
      		dispatch(ItemActions.setItems(data, getAction(path, 'set')));
    	});
  	},
};

export default ItemActions;