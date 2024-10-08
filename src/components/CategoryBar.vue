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
  methods: {
    selectCategory(category) {
      this.$emit("category-selected", category);
    },
  },
};
</script>
