<template>
  <div class="product-detail">
    <SaleBar />
    <div class="content-wrapper">
      <NavBar />
      <h1>{{ product.name }}</h1>
      <img :src="product.image" :alt="product.name" />
      <p>Price: {{ product.price }}</p>
      <p>Description: {{ product.description }}</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SaleBar from "@/components/SaleBar.vue";
import NavBar from "@/components/NavBar.vue";
import productService from "@/services/productService.js";

export default {
  name: "ProductDetail",
  props: ["id"],
  components: {
    SaleBar,
    NavBar,
  },
  data() {
    return {
      product: {},
    };
  },
  computed: {
    ...mapGetters(["selectedType"]), // Access the selectedType in product detail
  },
  async created() {
    // Fetch the product details using the ID
    this.product = await productService.getProductById(this.id);
  },
};
</script>
