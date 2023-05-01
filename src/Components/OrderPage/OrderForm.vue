<template>
  <div class="container"  style="height: 100vh">
    <h1 class="mb-4 mt-4">My Orders</h1>
    <div v-if="orders.length > 0">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th>Order Items</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.date }}</td>
            <td>${{ order.total }}</td>
            <td>
              <order-items :order="order"></order-items>
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
import OrderItems from './OrderItems.vue'

export default {
  name: 'OrderPage',

  components: {
    OrderItems
  },
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.orders = [
      {
        id: 1,
        date: "2022-04-23",
        total: 50.00,
        items: [
          { id: 1, title: "Product A", price: 10.00 },
          { id: 2, title: "Product B", price: 20.00 },
          { id: 3, title: "Product C", price: 20.00 }
        ]
      },
      {
        id: 2,
        date: "2022-03-15",
        total: 35.00,
        items: [
          { id: 4, title: "Product D", price: 15.00 },
          { id: 5, title: "Product E", price: 10.00 },
          { id: 6, title: "Product F", price: 10.00 }
        ]
      }
    ];
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
