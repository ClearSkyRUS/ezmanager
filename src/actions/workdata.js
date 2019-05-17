import { WorkDataApi } from 'utils/api'

const WorkDataActions = {
	setWorkData: (WorkData) => ({
		type: 'SET_WORK_DATA',
		payload: WorkData
	}),
	ChangePropsBuyListChecked: (product) => ({
		type: 'SET_CHECKED_PRODUCT',
		payload: product
	}),
	SetDaysCount: (count) => ({
		type: 'SET_DAYS_COUNT',
		payload: count
	}),
  	fetchWorkData: (dayscount) => dispatch => {
    	WorkDataApi.get(dayscount).then(({ data }) => {
      		dispatch(WorkDataActions.setWorkData(data));
    	});
  	},
  	setBuyListChecked: (product) => ({
		type: 'SET_CHECKED_PRODUCT',
		payload: product
	}),
  	setDishReady: (dish) => ({
		type: 'SET_CHECKED_DISH',
		payload: dish
	}),
  	showHideTechMap: (dish) => ({
		type: 'SET_VISIBLE_MAP',
		payload: dish
	}),
};


export default WorkDataActions;