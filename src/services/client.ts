import { extend } from 'umi-request';

const instance = extend({
  prefix: 'http://localhost:7002/',
  timeout: 4000,
  headers: {
    Authorization: localStorage.getItem('token') ?? '',
  },
});


// TODO: 此处写interceptors.

export default instance;
