import { axios } from 'core';

export default {
  get: dayscount => axios.get('/workdata/' + dayscount),
};