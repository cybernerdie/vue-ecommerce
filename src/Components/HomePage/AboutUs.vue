<template>
  <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
    <h1 class="display-4 text-center">Welcome to Our Online Store!</h1>
    <hr class="my-4">
    <p class="lead text-center">Shop the latest trends in fashion, home decor, electronics, and more.</p>
        <router-link to="/products" class="btn btn-outline-secondary btn-lg mt-3">Shop Now</router-link>
  </div>
</template>

<script>
export default {
  name: 'AboutUs'
}
</script>

<style scoped>
.jumbotron {
  background-color: #f8f9fa;
  padding: 2rem 1rem;
  margin-bottom: 0;
  border-radius: 0;
  min-height: 100vh;
}
</style>
