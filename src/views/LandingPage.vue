<template>
  <div class="landingPage">
    <SaleBar />
    <div class="content-wrapper">
      <NavBar @category-selected="filterProducts" />
      <CategoryBar
        :categories="categories"
        :selectedCategory="selectedCategory"
        @category-selected="filterByCategory"
        @sort-alphabetically="sortProductsAlphabetically"
        @sort-by-price="sortProductsByPrice"
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
      originalOrder: [],
    };
  },
  methods: {
    async loadProducts() {
      try {
        const products = await productService.fetchProducts();
        this.allProducts = products;
        this.originalOrder = [...products];
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
        this.categories = ["All", ...categories];
      } catch (error) {
        console.error("Error loading categories:", error);
      }
      console.log("categories =", this.categories);
      console.log("Selected type:", type);
      console.log("Filtered products:", this.filteredProducts);
    },
    // Filter products by category
    filterByCategory(category) {
      this.selectedCategory = category;
      this.filteredProducts = productService.filterProductsByCategory(
        this.allProducts,
        this.selectedType,
        category
      );
      console.log("Filtered products by category:", this.filteredProducts);
    },
    // Sort products alphabetically
    sortProductsAlphabetically(isSortActive) {
      this.isAlphabeticalSort = isSortActive;
      if (this.isAlphabeticalSort) {
        this.filteredProducts = [...this.filteredProducts].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else {
        this.filterProducts(this.selectedType);
      }

      console.log("Sorted products alphabetically:", this.filteredProducts);
    },
    sortProductsByPrice(order) {
      if (order === "lowToHigh") {
        this.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (order === "highToLow") {
        this.filteredProducts.sort((a, b) => b.price - a.price);
      }
      console.log("Filtered products sorted by price:", this.filteredProducts);
    },
  },
  mounted() {
    this.loadProducts();
  },
};
</script>
