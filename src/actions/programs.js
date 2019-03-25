import { ProgramsApi } from 'utils/api'


const ProgramActions = {
	setPrograms: (items) => ({
		type: 'SET_PROGRAMS',
		payload: items
	}),
	removeProgram: (id) => ({
		type: 'REMOVE_PROGRAM',
		payload: id
	}),
	addProgram: (item) => ({
		type: 'ADD_PROGRAM',
		payload: item
	}),
	upProgram: (item) => ({
		type: 'CHANGE_PROGRAM',
		payload: item
	}),
	fetchAddProgram: item => dispatch => {
		dispatch(ProgramActions.addProgram(item));
    	ProgramsApi.add(item);
    },
    fetchUpProgram: (item) => dispatch => {
		dispatch(ProgramActions.upProgram(item));
    	ProgramsApi.up(item);
    },
	fetchRemoveProgram: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(ProgramActions.removeProgram(id));
	      	ProgramsApi.remove(id);
	    }
  	},
  	fetchPrograms: () => dispatch => {
    	ProgramsApi.get().then(({ data }) => {
      		dispatch(ProgramActions.setPrograms(data));
    	});
  	},
};

export default ProgramActions;