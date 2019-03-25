import { axios } from 'core';

export default {
  get: () => axios.get('/days'),
  remove: id => axios.delete('/days/' + id),
  add: item => axios.post('/days/', item),
  up: item => axios.put('/days/' + item._id, item),
};