import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${store.state.token}`
  }
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${store.state.token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
