import { DaysApi } from 'utils/api'


const DaysActions = {
	setDays: (items) => ({
		type: 'SET_DAYS',
		payload: items
	}),
	removeDay: (id) => ({
		type: 'REMOVE_DAY',
		payload: id
	}),
	addDay: (item) => ({
		type: 'ADD_DAY',
		payload: item
	}),
	upDay: (item) => ({
		type: 'CHANGE_DAY',
		payload: item
	}),
	fetchAddDay: item => dispatch => {
		dispatch(DaysActions.addDay(item));
     DaysApi.add(item);
    },
    fetchUpDay: (item) => dispatch => {
		dispatch(DaysActions.upDay(item));
     DaysApi.up(item);
    },
	fetchRemoveDay: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(DaysActions.removeDay(id));
	       DaysApi.remove(id);
	    }
  	},
  	fetchDays: () => dispatch => {
     DaysApi.get().then(({ data }) => {
      		dispatch(DaysActions.setDays(data));
    	});
  	},
};


export default DaysActions;