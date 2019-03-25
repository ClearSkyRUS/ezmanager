import { axios } from 'core';

export default {
  get: () => axios.get('/dishs'),
  remove: id => axios.delete('/dishs/' + id),
  add: item => axios.post('/dishs/', item),
  up: item => axios.put('/dishs/' + item._id, item),
};