<template>
  <div class="container grid">
    <div class="row">
      <div class="row col-6 pb-4 pr-1">
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="sortDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by
          </button>
          <div class="dropdown-menu" aria-labelledby="sortDropdown">
            <h6 class="dropdown-header">Sort by Date:</h6>
            <a class="dropdown-item" @click="sortProducts('date', 'desc')"
              >Latest</a
            >
            <a class="dropdown-item" @click="sortProducts('date', 'asc')"
              >Oldest</a
            >
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Sort by Price:</h6>
            <a class="dropdown-item" @click="sortProducts('price', 'asc')"
              >Low to High</a
            >
            <a class="dropdown-item" @click="sortProducts('price', 'desc')"
              >High to Low</a
            >
            <div class="dropdown-divider"></div>
            <h6 class="dropdown-header">Sort by Name:</h6>
            <a class="dropdown-item" @click="sortProducts('name', 'asc')"
              >A to Z</a
            >
            <a class="dropdown-item" @click="sortProducts('name', 'desc')"
              >Z to A</a
            >
          </div>
        </div>
      </div>
      <div class="searc d-none d-xl-block d-lg-block pr-3">
        <form @submit.prevent="searchProducts" @keyup.enter="searchProducts">
          <input type="search" class="search" v-model="searchTerm" />
          <button type="submit" class="btn-search">Search</button>
        </form>
      </div>
      <div v-if="isLoading" class="spinner-container">
        <div class="spinner-border text-info"></div>
      </div>
      <div v-else class="row justify-content-center">
        <div
          class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center"
        >
          <div>
            <div v-if="products.length === 0">
              <h4 style="margin-left: 9rem; margin-right: 9rem">
                Sorry, we can't find a product with these features
              </h4>
            </div>
            <div v-else>
              <Card :CardArray="slicedCards" />
            </div>
          </div>
          <div
            class="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 py-5"
          >
            <button
              v-if="this.metaData.current_page < metaData.last_page"
              type="button"
              @click="loadMore"
              class="btn btn-outline-secondary btn-lg btn-block"
            >
              More +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slider from "./slider.vue";
import Card from "./Card.vue";
import axios from "@/axios.js";

export default {
  name: "Grid",

  components: {
    slider,
    Card,
  },

  data() {
    return {
      metaData: [],
      showCards: 6,
      sortButton: "DEFAULT",
      isLoading: false,
      searchTerm: "",
      products: [],
    };
  },

  watch: {
    searchTerm(newValue, oldValue) {
      if (newValue === "") {
         this.fetchProducts();
      }
    },
  },

  mounted() {
    this.fetchProducts();
  },

  computed: {
    slicedCards() {
      return this.products.slice(0, this.showCards);
    },
  },

  methods: {
    loadMore() {
      this.getMoreProducts();
    },

    async fetchProducts() {
      try {
        this.isLoading = true;
        const response = await axios.get("/products");
        const data = response.data;
        this.products = data.data;
        this.metaData = data.meta
        this.showCards = data.meta.per_page
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async getMoreProducts() {
      if (this.metaData.current_page < this.metaData.last_page) {
        const nextPage = this.metaData.current_page + 1;
        try {
          this.isLoading = true;
          const response = await axios.get(`/products?page=${nextPage}`);
          this.processResponseData(response.data);
        } catch (error) {
          console.error(error);
        } finally {
        this.isLoading = false;
      }
      }
    },

    async searchProducts() {
      if (!this.searchTerm) {
        return;
      }

      try {
        this.isLoading = true;
        const response = await axios.get(
          `/products?search_item=${this.searchTerm}`
        );
        this.processResponseData(response.data);
      } catch (error) {
        this.$toast.error(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },

    async sortProducts(sortBy, sortOrder) {
      try {
        this.isLoading = true;
        const response = await axios.get(
          `/products?sort_by=${sortBy}&sort_order=${sortOrder}`
        );
        this.processResponseData(response.data);
      } catch (error) {
        this.$toast.error(error.response.data.message);
      } finally {
        this.isLoading = false;
      }
    },

    processResponseData(data) {
      this.products = data.data
      this.metaData = data.meta;
      this.showCards = data.meta.per_page
    },
  },
};
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
.dropdown-menu {
  background-color: #eee;
  color: #2c3539;
}

.dropdown-menu > a:hover {
  background-color: #dae0e5;
}

.btn-outline-secondary {
  border-radius: 0 !important;
}

.card-selector {
  color: #dcdcdc;
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
  cursor: pointer;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
