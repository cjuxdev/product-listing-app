import axios from "axios";

const productService = {
  async fetchProducts() {
    try {
      const response = await axios.get("/mock-data/products.json");
      return response.data; // Return the full list of products
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // Filter products by type (e.g., men, women)
  filterProductsByType(products, type) {
    if (type === "all") {
      return products; // If "all", return the full list
    }
    return products.filter(
      (product) => product.type.toLowerCase() === type.toLowerCase()
    );
  },
  filterProductsByCategory(products, type, category) {
    // First filter by type
    let filteredProducts = this.filterProductsByType(products, type);

    console.log(" OMG = ", products, type, category);
    if (category && category !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    return filteredProducts;
  },
};

export default productService;
