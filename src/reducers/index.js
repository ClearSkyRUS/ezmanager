import { combineReducers } from 'redux';

import windowUser from './ui/windowUser';
import filter from './ui/filter';

import products from './objects/products';
import dishs from './objects/dishs';
import clients from './objects/clients';
import orders from './objects/orders';
import programs from './objects/programs';
import days from './objects/days';
import dishTypes from './objects/dishTypes';
import daysQuery from './objects/daysQuery';

import workdata from './heavy/workdata';

export default combineReducers({
		products,
		dishs,
		days,
		clients,
		dishTypes,
		daysQuery,
		windowUser,
		filter,
		orders,
		programs,
		workdata
});