<template>
  <div>
    <transition-group name="fade" class="row" tag="div">
      <div v-for="item in CardArray" class="col-6 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-4 pb-3" :key="item.id">
    <div class="card">
      <img class="card-img-top" :src="item.image_url" alt="Card image cap">
      <div class="overlay">
        <button type="button" class="btn btn-outline-secondary btn-lg" @click="addtoCart(item, item.id)">Add +</button>
        <router-link to="/Info"><button type="button" class="btn btn-outline-secondary btn-lg" @click="sendInfo(item)">Info</button></router-link>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text">${{ item.price }}</p>
      </div>
    </div>
</div>

    </transition-group>
  </div>

</template>

<script>
import axios from "@/axios.js";

export default {
  props: ['CardArray'],
  name: 'Card',

  data() {
    return {
      quan: 1,
    }
  },

  methods: {
    async addtoCart(it, id) {
      // check if user is authenticated
      const isAuthenticated = this.$store.getters.isAuthenticated;
      if (!isAuthenticated) {
        // show error message and redirect to login page
        this.$toast.info("Please log in to add items to your cart.");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.post('/cart', {product_id: id, quantity: this.quan});
        this.$store.dispatch('fetchCartItems');
        this.$toast.success(response.data.message);
      } catch (error) {
        this.$toast.error(error.response.data.message);
        console.log(error);
      }
    },

    sendInfo(it) {
     this.$store.commit('addtoInfo', it)
    }
  }
}
</script>

<style>
/* transition Group style */
.fade-move {
  transition: transform 1s;
}
/* Card Style */
.card {
  transition: 500ms;
  position: relative;
  overflow: hidden;
}

.card img {
  z-index: 1;
}

.card button {
  width: 140px;
  margin-bottom: 10px;
}

.card:hover img {
  filter: blur(4px);
}

.card:hover .overlay {
  opacity: 0.8;

}

.card .overlay {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  background-color: #232b34;
  opacity: 0;
  z-index: 100;
  transition: all 0.3s ease-in;
}

.card:hover, .card:active {
  transform: scaleY(1.1) scaleX(1.06);
  box-shadow: 0 14px 98px rgba(0, 0, 0, 0.25), 0 0px 60px rgba(0, 0, 0, 0.22);
}
</style>
