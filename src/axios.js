import axios from 'axios'
import store from './store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${store.state.token}`
  }
})

export default instance
