<template>
  <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in order.items" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity * item.price }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'OrderItems',
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>
