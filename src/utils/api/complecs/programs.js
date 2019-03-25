import { axios } from 'core';

export default {
  get: () => axios.get('/programs'),
  remove: id => axios.delete('/programs/' + id),
  add: item => axios.post('/programs/', item),
  up: item => axios.put('/programs/' + item._id, item),
};