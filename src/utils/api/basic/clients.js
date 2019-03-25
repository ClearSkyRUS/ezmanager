import { axios } from 'core';

export default {
  get: () => axios.get('/clients'),
  remove: id => axios.delete('/clients/' + id),
  add: item => axios.post('/clients/', item),
  up: item => axios.put('/clients/' + item._id, item),
};