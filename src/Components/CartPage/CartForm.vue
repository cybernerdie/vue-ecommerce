<template>
  <div class="container my-5 mb-4" style="min-height: 100vh">
    <h1>My Cart</h1>
    <div class="row" style="display: flex; justify-content: space-between;">
      <div class="col-md-7">
        <div v-if="cartItems.length">
          <div v-for="item in cartItems" class="row border-top py-3" :key="item.id">
            <div class="col-4">
              <img :src="item.product.image_url" alt="product image" class="img-fluid">
            </div>
            <div class="col-8 d-flex flex-column justify-content-between">
              <div>
                <h5>{{ item.product.name }}</h5>
                <p class="mb-2">${{ item.product.price }}</p>
                <div class="d-flex justify-content-start align-items-center">
                  <button class="btn btn-link btn-sm p-0 mr-2" @click="removeItem(item)">Remove</button>
                  <button class="btn btn-link btn-sm p-0" @click="updateItem(item)">Update</button>
                </div>
              </div>
              <div>
                <label class="mb-0">Quantity:</label>
                <input type="number" class="form-control form-control-sm" v-model.number="item.quantity" min="1">
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end my-3">
            <button class="btn btn-secondary mr-2" @click="clearCart">Clear Cart</button>
          </div>
        </div>
        <div v-else>
          <p>Your cart is empty</p>
          <router-link to="/products" class="btn btn-primary">Continue Shopping</router-link>
        </div>
      </div>
      <div class="col-md-4 mt-4 mt-md-0">
        <h5 class="mb-3">Order Summary</h5>
        <div class="d-flex justify-content-between align-items-center border-top py-2">
          <span>Subtotal:</span>
          <span>${{ orderTotal }}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center border-top py-2">
          <span>Shipping:</span>
          <span>$0.00</span>
        </div>
        <div class="d-flex justify-content-between align-items-center border-top py-2">
          <span>Total:</span>
          <span>${{ orderTotal }}</span>
        </div>
        <button class="btn btn-primary btn-block mt-3" @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  name: 'CartForm',

  created(){
    this.$store.dispatch('fetchCartItems')
  },

  computed: {
    cartItems(){
     return this.$store.state.cartItems
    },

    orderTotal(){
      return this.$store.getters.totalPrice
    },
  },

  methods: {
      async handleApiRequest(method, url, data = null) {
        try {
          const response = await axios({ method, url, data });
          this.$store.dispatch('fetchCartItems');
          this.$toast.success(response.data.message);
        } catch (error) {
          this.$toast.error(error.response.data.message);
          console.log(error);
        }
    },

    async removeItem(item) {
      await this.handleApiRequest('DELETE', `/cart/${item.id}`);
    },

    async updateItem(item) {
      await this.handleApiRequest('PUT', `/cart/${item.id}`, { quantity: item.quantity });
    },

    async clearCart() {
      await this.handleApiRequest('DELETE', '/cart');
      this.cartItems = [];
    },

    async checkout() {
      await this.handleApiRequest('POST', '/checkout');
      this.$store.dispatch('fetchOrders')
      this.$router.push('/orders');
    },
  }
}
</script>