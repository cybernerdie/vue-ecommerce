<template>
  <div class="container-flex">
    <nav class="navbar navbar-light">
      <div class="dropdown d-xl-none d-lg-none mr-auto">
        <img src="/menu.png" data-toggle="dropdown" data-target="#navd" aria-haspopup="true" aria-expanded="false" style="width:5%">
        <div class="dropdown-menu hb" aria-labelledby="navd">
          <router-link class="dropdown-item" to="/">Home</router-link>
          <router-link class="dropdown-item" to="/products">Products</router-link>
          <router-link v-if="user" class="dropdown-item" to="/orders">Orders</router-link>
        </div>
      </div>
      <!--Logo-->
      <a class="navbar-brand py-0 pl-5">
          <img src="@/assets/fi-logo.svg" width="50" height="50">
      </a>
      <!--Header navigation-->
      <span class="navbar-item bc d-none d-xl-block d-lg-block py-0">
        <router-link class="pl-5" to="/">Home</router-link>
        <router-link class="px-5" to="/products">Products</router-link>
        <router-link v-if="user" to="/orders">Orders</router-link>
      </span>

      <p class="navbar-item ml-auto"></p>

      <router-link v-if="user" to="/">
      <div class="user" @click="logout">
        <h5>Logout</h5>
      </div>
    </router-link>

      <router-link v-else to="/login">
        <div class="user">
          <h5>Sign In</h5>
        </div>
      </router-link>

        <router-link v-if="user" to="/cart" class="bag">
        <img class="pb-1" src="@/assets/cart.svg">
        <span class="mb-3" v-if="this.bagItemscount > 0">{{ bagItemscount }}</span>
        </router-link>
    </nav>
    </div>
</template>

<script>

import axios from "@/axios.js";

export default {
  name: 'Header',

  computed: {
    bagItemscount() {
      return this.$store.getters.itemsNumber
    },

    user() {  
      return this.$store.state.user !== null;
    },
  },

  methods: {
    openCart() {
      this.$refs.cartMove.cartON()
    },

    async logout() {
        try {
          await axios.post('/auth/logout');
          this.$toast.success('Logout successful');
          this.$router.push("/login");
        } catch (error) {
          this.$toast.error(error.response.data.message);
        } finally {
          this.$store.commit('setUser', null);
          this.$store.commit('setToken', null);
        }
    }
  },

  mounted() {
    const token = this.$store.state.token;
    if (token) {
      this.$store.dispatch('fetchCartItems')
    }
  }
}
</script>

<style>
nav {
  z-index:100;
}
.navbar {
  border-bottom: 1px solid #DCDCDC;
  background-color: #F8F8F8;
}

.close {
  position:relative;
  bottom:20px;
  left:10px;
  font-size: 31px;
  color: #000;
}
.navbar-item.bc a {
  font-size: 17px;
  text-decoration: none;
  color: black;
}

.navbar-item.bc a:hover, .navbar-item.bc a:active {
  color: #FFD700;
}
.btn-sm{
  border-radius: 0;
}

.search {
  outline: none;
  border: 1px #F8F8F8;
  background: #ededed url('../assets/search.png') no-repeat 5px center;
  padding: 5px 8px 0px 26px;
  width: 500px;
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
  margin-right: 10px;
}

form .btn-xl.btn-success.mt-3 {
  position: relative;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  width: 100%;
  height: 50px;
  font-size: 20px;
  outline:none;
  cursor: pointer;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.bag span {
    background-color: #6394F8;
    border-radius: 10px;
    color: white;
    position: absolute;
    font-size: 15px;
    line-height: 1;
    padding: 2px 3px 3px 3px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    margin-left: -9px;
    bottom: 1rem;
}

.bag img {
  cursor: pointer;
  width: 30px;
  height: auto;
}

.user{
  margin-right: 20px;
  padding-top: 10px;
}

.user:hover {
  text-decoration: underline;
}

.btn-search {
  background-color: #007bff;
  border: none;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-search:hover {
  background-color: #0069d9;
}

</style>
