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
        <div
          v-if="visibleFilteredProducts.length === 0"
          class="no-products-message"
        >
          <p>Currently unavailable. It will be available soon...</p>
        </div>
        <ProductCard
          v-for="(product, index) in visibleFilteredProducts"
          :key="index"
          :product="product"
        />
      </div>
      <!-- Only show Pagination if there are enough products -->
      <PaginationBar
        v-if="filteredProducts.length > itemsPerPage && totalPages > 1"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-changed="changePage"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
      categories: ["All"],
      selectedCategory: "All",
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    ...mapState({
      selectedType: (state) => state.selectedType, // Get selectedType from Vuex
    }),
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    paginatedItems() {
      // Get the items for the current page
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
  },
  methods: {
    ...mapActions(["updateSelectedType"]),
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
      //this.selectedType = type;
      this.updateSelectedType(type);
      this.selectedCategory = "All";
      this.currentPage = 1; // Reset to page 1 when type changes
      this.filteredProducts = productService.filterProductsByType(
        this.allProducts,
        type
      );
      try {
        const categories = await fetchCategoriesByType(type);
        this.categories = ["All", ...categories];
      } catch (error) {
        console.error("Error loading categories:", error);
      }
      this.applyFilters(); // Apply filters to current page products
    },

    // Filter products by category
    filterByCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1; // Reset to the first page when the category changes
      this.applyFilters(); // Apply filters to paginated data
    },

    // Sort products alphabetically within the current page
    sortProductsAlphabetically(isSortActive) {
      if (isSortActive) {
        this.visibleFilteredProducts = [...this.visibleFilteredProducts].sort(
          (a, b) => a.name.localeCompare(b.name)
        );
      } else {
        this.applyFilters(); // Reset to original order
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
      this.applyFilters(); // Reapply filters for the new page
    },

    // Apply filters on paginated data
    applyFilters() {
      let filtered = [...this.allProducts]; // Start with all products

      // Filter by selected type
      filtered = productService.filterProductsByType(
        filtered,
        this.selectedType
      );

      // Filter by category
      if (this.selectedCategory !== "All") {
        filtered = productService.filterProductsByCategory(
          filtered,
          this.selectedType,
          this.selectedCategory
        );
      }

      this.filteredProducts = filtered; // Update filtered products

      // Update visible products based on current page
      this.visibleFilteredProducts = this.paginatedItems;
    },
  },
  mounted() {
    this.loadProducts(); // Load products on mount
  },
};
</script>
