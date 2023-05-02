import Vue from 'vue';
import Vuex from 'vuex';
import axios from "@/axios.js";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infoPage:[],
    cartItems:[],
    products: [],
    orders: [],
    meta: '',
    isLoading: false,
    user: null,
    token: null  
  },

  plugins: [createPersistedState()],
  getters: {
    itemsNumber(state){  
      return state.cartItems.length
    },

    totalPrice(state) { 
      if (state.cartItems.length !== 0) {
        let totalPrice = state.cartItems.reduce((total, item) => {
          if (item.product && item.product.price) {
            return total + (item.product.price * item.quantity);
          } else {
            return total;
          }
        }, 0);
        
        return Number(totalPrice.toFixed(3));
      } else {
        return 0;
      }
    },
    
    isAuthenticated(state) {
      return state.token !== null;
    },

    infoLength(state) { 
      if(state.infoPage.length > 0) {
        return state.infoPage.splice(0, 1)
      }
    }
  },
  mutations: {

    setUser(state, user) {
      state.user = user
    },

    setToken(state, token) {
      state.token = token
    },

    setProductData(state, data) {
      state.products = data.data
      state.meta = data.meta
    },

    setCartItems (state, items) {
      state.cartItems = items
    },

    setOrders (state, orders) {
      state.orders = orders
    },

    inCart(state, n) { 
      return state.cartItems.push(n)
    },

    addtoInfo(state, n) { 
       return state.infoPage.push(n)
    },
  },

  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('/products');
        const data = response.data;
        commit('setProductData', data);
      } catch (error) {
        console.error(error);
      }
    },

    async fetchCartItems({ commit }) {
      try {
        const response = await axios.get('/cart');
        commit('setCartItems', response.data.data)
      } catch (error) {
        console.log(error)
      }
    },

    async fetchOrders({ commit }) {
      try {
        const response = await axios.get('/orders');
        commit('setOrders', response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  },
  
})
