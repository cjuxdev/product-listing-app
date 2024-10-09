<template>
  <div class="category-list">
    <ul>
      <li
        v-for="(category, index) in categories"
        :key="index"
        :class="{ active: category === selectedCategory }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </li>
    </ul>
    <ul class="filters" ref="priceFilter">
      <li
        class="filter-1"
        :class="{ active: isSortAlphabeticallyActive }"
        @click="sortAlphabetically"
      ></li>
      <li class="filter-2">
        <span @click="togglePopover" class="filter-2-icon"></span>
        <div v-if="popoverVisible" class="popover" style="z-index: 1000">
          <div class="form-check" @click="sortByPrice('lowToHigh')">
            <input
              class="form-check-input"
              type="radio"
              name="priceSort"
              id="priceLowToHigh"
              value="lowToHigh"
              @change="sortByPrice('lowToHigh')"
              :checked="isSortPriceActive === 'lowToHigh'"
            />
            <label class="form-check-label" for="exampleRadios1">
              Sort by: Price (Low to High)
            </label>
          </div>
          <div class="form-check" @click="sortByPrice('highToLow')">
            <input
              class="form-check-input"
              type="radio"
              name="priceSort"
              id="priceHighToLow"
              value="highToLow"
              @change="sortByPrice('highToLow')"
              :checked="isSortPriceActive === 'highToLow'"
            />
            <label class="form-check-label" for="exampleRadios1">
              Sort by: Price (High to Low)
            </label>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: String,
      default: "All",
    },
  },
  data() {
    return {
      isSortAlphabeticallyActive: false,
      isSortPriceActive: null,
      popoverVisible: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    selectCategory(category) {
      this.$emit("category-selected", category);
    },
    sortAlphabetically() {
      this.isSortAlphabeticallyActive = !this.isSortAlphabeticallyActive;
      this.isSortPriceActive = null;
      this.$emit("sort-alphabetically", this.isSortAlphabeticallyActive);
    },
    togglePopover() {
      this.popoverVisible = !this.popoverVisible;
    },
    sortByPrice(order) {
      this.isSortPriceActive = order;
      this.isSortAlphabeticallyActive = false;
      //this.isSortActive = true;
      //this.popoverVisible = false;
      this.$emit("sort-by-price", order);
    },
    handleClickOutside(event) {
      const categoryList = this.$refs.priceFilter;
      if (categoryList && !categoryList.contains(event.target)) {
        this.popoverVisible = false; // Hide the popover when clicked outside
      }
    },
  },
};
</script>
