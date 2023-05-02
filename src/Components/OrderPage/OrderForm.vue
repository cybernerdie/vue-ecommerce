<template>
  <div class="container mb-4"  style="min-height: 100vh">
    <h1 class="mb-4 mt-4">My Orders</h1>
    <div v-if="orders.length > 0">
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th>Order Items</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="order.id">
            <td>{{ index + 1}}</td>
            <td>{{ order.order_date | formatDate }}</td>
            <td>${{ order.total_amount }}</td>
            <td>
              <ul>
                <li v-for="(item, index) in order.items" :key="index">
                    {{ item.product.name }} x {{ item.quantity }} - ${{ item.total_amount }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>You have no orders yet.</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'OrderPage',

  data() {
    return {
      orders: [],
      serialNumber: 1
    }
  },

  created(){
    this.$store.dispatch('fetchOrders')
    this.orders = this.getOrders
  },

  computed: {
    getOrders(){
    return this.$store.state.orders
    },
  },

  filters: {
  formatDate: function(value) {
    if (value) {
      return moment(String(value)).format('MMM DD, YYYY hh:mm')
    }
  }
}
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
}

th {
  background-color: #ddd;
}
</style>
