<template>
  <div class="landingPage">
    <SaleBar />
    <NavBar @category-selected="filterProducts" />
    <CategoryBar
      :categories="categories"
      :selectedCategory="selectedCategory"
      @category-selected="filterByCategory"
    />
    <!-- <ProductCard /> -->
    <div class="product-list">
      <ProductCard
        v-for="(product, index) in filteredProducts"
        :key="index"
        :product="product"
      />
    </div>
    <PaginationBar />
  </div>
</template>

<script>
import productService from "@/services/productService.js";
import { fetchCategoriesByType } from "@/services/productCategoryService.js";

import SaleBar from "@/components/SaleBar.vue";
import NavBar from "@/components/NavBar.vue";
import ProductCard from "@/components/ProductCard.vue";
import CategoryBar from "@/components/CategoryBar.vue";
import PaginationBar from "@/components/PaginationBar.vue";

export default {
  name: "LandingPage",
  components: {
    SaleBar,
    NavBar,
    ProductCard,
    CategoryBar,
    PaginationBar,
  },
  data() {
    return {
      allProducts: [],
      filteredProducts: [],
      selectedType: "men",
      categories: ["All"],
      selectedCategory: "All",
    };
  },
  methods: {
    async loadProducts() {
      try {
        const products = await productService.fetchProducts();
        this.allProducts = products;
        this.filterProducts(this.selectedType);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    },

    // Filter products by type
    async filterProducts(type) {
      this.selectedType = type;
      this.selectedCategory = "All";
      this.filteredProducts = productService.filterProductsByType(
        this.allProducts,
        type
      ); // Filter products

      try {
        const categories = await fetchCategoriesByType(type);
        this.categories = ["All", ...categories]; // Include 'All' option
      } catch (error) {
        console.error("Error loading categories:", error);
      }
      console.log("categories =", this.categories);
      console.log("Selected type:", type);
      console.log("Filtered products:", this.filteredProducts);
    },
    // Filter products by category
    filterByCategory(category) {
      this.selectedCategory = category; // Update the selected category
      this.filteredProducts = productService.filterProductsByCategory(
        this.allProducts,
        this.selectedType,
        category
      );
      console.log("Filtered products by category:", this.filteredProducts);
    },
  },
  mounted() {
    this.loadProducts(); // Load products when component is mounted
  },
};
</script>
