import { axios } from 'core';

export default {
  get: () => axios.get('/products'),
  remove: id => axios.delete('/products/' + id),
  add: item => axios.post('/products/', item),
  up: item => axios.put('/products/' + item._id, item),
};