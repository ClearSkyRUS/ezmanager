import { axios } from 'core';

export default {
  get: path => axios.get('/crm/' + path),
  remove: (path, id) => axios.delete('/crm/' + path + '/' + id), 
  add: (path, item) => axios.post('/crm/' + path, item),
  up: (path, id, data) => axios.put('/crm/' + path + '/' + id, data)
};