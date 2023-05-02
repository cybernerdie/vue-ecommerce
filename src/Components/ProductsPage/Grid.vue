<template>
  <div class="container grid">   
    <div class="row"> 
      <div class="row col-6 pb-4 pr-1">
        <div class="dropdown">
          <button class="btn dropdown-toggle" type="button" id="sortDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort by
          </button>
          <div class="dropdown-menu" aria-labelledby="sortDropdown">
            <h6 class="dropdown-header">Sort by Date:</h6>
            <a class="dropdown-item" @click="sortProducts('date', 'desc')">Latest</a>
            <a class="dropdown-item" @click="sortProducts('date', 'asc')">Oldest</a>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Sort by Price:</h6>
            <a class="dropdown-item" @click="sortProducts('price', 'asc')">Low to High</a>
            <a class="dropdown-item" @click="sortProducts('price', 'desc')">High to Low</a>
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Sort by Name:</h6>
            <a class="dropdown-item" @click="sortProducts('name', 'asc')">A to Z</a>
            <a class="dropdown-item" @click="sortProducts('name', 'desc')">Z to A</a>
          </div>
        </div>

      </div>
           <div class="searc d-none d-xl-block d-lg-block pr-3">
            <form @submit.prevent="searchProducts" @keyup.enter="searchProducts">
            <input type="search" class="search" v-model="searchTerm">
            <button type="submit" class="btn-search">Search</button>
          </form>
            </div>
      <div class="row justify-content-center">
        <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
          <div v-if="this.products == 0" class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h4 style="margin-left:9rem;margin-right:9rem">Sorry, we can't find a product with this features</h4>
          </div>

            <Card :CardArray="slicedCards" />

          <div class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5">
            <button v-if="this.metaData.current_page < metaData.last_page" type="button" @click="loadMore" class="btn btn-outline-secondary btn-lg btn-block">More +</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from './slider.vue'
import Card from './Card.vue'
import axios from "@/axios.js";

export default {
  name:'Grid',

  components: {
    slider, Card
  },

  data() {
    return {
      products: [],
      metaData: [],
      showCards: 6,
      sortButton: 'DEFAULT',
      isLoading: false,
      searchTerm: ''
    }
  },

  created() {
    this.$store.dispatch('fetchProducts')
    this.products = this.getProducts
    this.showCards = this.setShowCards
    this.metaData = this.setMetaData
  },

  watch: {
      searchTerm(newValue, oldValue) {
        if (newValue === '') {
           this.$store.dispatch('fetchProducts').then(() => {
              this.products = this.getProducts;
              this.showCards = this.setShowCards
              this.metaData = this.setMetaData
      });
        }
      }
  },

  computed: {
    getProducts(){
    return this.$store.state.products
    },

    setShowCards(){
    return this.$store.state.meta.per_page
    },

    setMetaData(){
    return this.$store.state.meta
    },

    slicedCards(){
      return this.products.slice(0, this.showCards)
    }
  },
  methods: {

    loadMore() {
      this.getMoreProducts()
    },

    async getMoreProducts() {
      if (this.metaData.current_page < this.metaData.last_page) {
        const nextPage = this.metaData.current_page + 1;
         try {
          const response = await axios.get(`/products?page=${nextPage}`);
            this.processResponseData(response.data)
        } catch (error) {
          console.error(error);
        } 
      }
    },

    async searchProducts() {
      if (!this.searchTerm) {
        return;
      }

      try {
        const response = await axios.get(`/products?search_item=${this.searchTerm}`)
          this.processResponseData(response.data)
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
    },

    async sortProducts(sortBy, sortOrder) {
       try {
          const response = await axios.get(`/products?sort_by=${sortBy}&sort_order=${sortOrder}`);
          this.processResponseData(response.data)
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
    },

    processResponseData(data) {
      this.$store.commit('setProductData', data);
      this.products = this.getProducts
      this.showCards = this.setShowCards
      this.metaData = this.setMetaData
    }
  }
  }
</script>

<style>
.container.grid {
  min-height: 60rem;
}

.container.grid a {
  cursor: pointer !important;
}

.btn-light {
  color: black !important;
  background: white;
  border-radius: 0 !important;
  border: 1px solid grey !important;
}
.dropdown-menu{
  background-color: #eee;
  color: #2c3539;
}

.dropdown-menu > a:hover{
  background-color: #dae0e5

}

.btn-outline-secondary {
  border-radius: 0 !important;
}

.card-selector {
  color: #DCDCDC;
  height: 40rem;
  background: #2c3539 !important;
  box-shadow: 0 8px 6px 0 rgba(0, 0, 0, 0.1), 0 26px 70px 0 rgba(0, 0, 0, 0.69);
}

.search-title h6 {
  cursor: pointer;
}

.circle {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  border: 0.7px solid #2c3539;
  display: inline-block;
  margin-left: 6px;
  cursor:pointer
}
</style>
