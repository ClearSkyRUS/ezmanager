import { DishsApi } from 'utils/api'


const DishsActions = {
	setDishs: (items) => ({
		type: 'SET_DISHS',
		payload: items
	}),
	removeDish: (id) => ({
		type: 'REMOVE_DISH',
		payload: id
	}),
	addDish: (item) => ({
		type: 'ADD_DISH',
		payload: item
	}),
	upDish: (item) => ({
		type: 'CHANGE_DISH',
		payload: item
	}),
	fetchAddDish: item => dispatch => {
		dispatch(DishsActions.addDish(item));
    	DishsApi.add(item);
    },
    fetchUpDish: (item) => dispatch => {
		dispatch(DishsActions.upDish(item));
    	DishsApi.up(item);
    },
	fetchRemoveDish: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(DishsActions.removeDish(id));
	      	DishsApi.remove(id);
	    }
  	},
  	fetchDishs: () => dispatch => {
    	DishsApi.get().then(({ data }) => {
      		dispatch(DishsActions.setDishs(data));
    	});
  	},
};


export default DishsActions;