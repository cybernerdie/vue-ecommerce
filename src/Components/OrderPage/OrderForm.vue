<template>
  <div class="container mb-4" style="min-height: 100vh">
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
            <td>{{ index + 1 }}</td>
            <td>{{ moment(order.order_date).format("MMM DD, YYYY hh:mm") }}</td>
            <td>${{ order.total_amount }}</td>
            <td>
              <ul>
                <li v-for="(item, index) in order.items" :key="index">
                  {{ item.product.name }} x {{ item.quantity }} - ${{
                    item.total_amount
                  }}
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
import moment from "moment";

export default {
  name: "OrderPage",

  data() {
    return {
      serialNumber: 1,
      moment,
    };
  },

  created() {
    this.$store.dispatch("fetchOrders");
  },

  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
}

th {
  background-color: #ddd;
}
</style>
