import axios from "axios";

export const fetchCategoriesByType = async (type) => {
  try {
    const response = await axios.get("/mock-data/productsCategories.json");
    const categories = response.data[type] || []; // Return an empty array if type is not found
    return categories;
  } catch (error) {
    console.error("Error loading categories:", error);
    return [];
  }
};
