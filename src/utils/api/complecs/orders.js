import { axios } from 'core';

export default {
  get: () => axios.get('/orders'),
  remove: id => axios.delete('/orders/' + id),
  add: item => axios.post('/orders/', item),
  up: item => axios.put('/orders/' + item._id, item),
};