import { extend } from 'umi-request';

const instance = extend({
  prefix: process.env.APIS_PREFIX,
  timeout: 4000,
  headers: {
    Authorization: localStorage.getItem('token') ?? '',
  },
});

// TODO: 此处写interceptors.

export default instance;
