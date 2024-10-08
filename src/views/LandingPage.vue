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
      <!-- Product List -->
      <div class="product-list">
        <ProductCard
          v-for="(product, index) in visibleFilteredProducts"
          :key="index"
          :product="product"
        />
      </div>
      <PaginationBar
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-changed="changePage"
      />
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
      visibleFilteredProducts: [],
      selectedType: "men",
      categories: ["All"],
      selectedCategory: "All",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedItems() {
      // Renamed to 'paginatedItems' to avoid duplication with data property
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
  },
  methods: {
    async loadProducts() {
      try {
        const products = await productService.fetchProducts();
        this.allProducts = products;
        this.filterProducts(this.selectedType); // Load products of the selected type
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
      ); // Filter products by type

      try {
        const categories = await fetchCategoriesByType(type);
        this.categories = ["All", ...categories];
      } catch (error) {
        console.error("Error loading categories:", error);
      }
      this.applyFilters();
    },

    // Filter products by category
    filterByCategory(category) {
      this.selectedCategory = category;
      this.applyFilters();
    },

    // Sort products alphabetically within the current page
    sortProductsAlphabetically(isSortActive) {
      if (isSortActive) {
        this.visibleFilteredProducts = [...this.visibleFilteredProducts].sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      } else {
        this.applyFilters();
      }
    },

    // Sort products by price within the current page
    sortProductsByPrice(order) {
      if (order === "lowToHigh") {
        this.visibleFilteredProducts = [...this.visibleFilteredProducts].sort(
          (a, b) => a.price - b.price
        );
      } else if (order === "highToLow") {
        this.visibleFilteredProducts = [...this.visibleFilteredProducts].sort(
          (a, b) => b.price - a.price
        );
      }
    },

    // Update the current page and apply filters to the new page's data
    changePage(page) {
      this.currentPage = page;
      this.applyFilters();
    },

    // Apply filters on paginated data
    applyFilters() {
      let filtered = [...this.paginatedItems];

      // Filter by category if needed
      if (this.selectedCategory !== "All") {
        filtered = productService.filterProductsByCategory(
          filtered,
          this.selectedType,
          this.selectedCategory
        );
      }

      this.visibleFilteredProducts = filtered;
    },
  },
  mounted() {
    this.loadProducts(); // Load products on mount
  },
};
</script>
