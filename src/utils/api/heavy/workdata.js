import { axios } from 'core';

export default {
  get: dayscount => axios.get('crm/workdata/' + dayscount),
};