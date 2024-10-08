<template>
  <div class="pagination-bar">
    <button @click="prevPage" :disabled="currentPage === 1" class="btn-left">
      <img src="@/assets/img/right.png" />
    </button>
    <div class="page-numbers-container">
      <div
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        class="page-number"
        @click="selectPage(page)"
      >
        {{ page }}
      </div>
    </div>
    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="btn-right"
    >
      <img src="@/assets/img/left.png" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    selectPage(page) {
      this.$emit("page-changed", page);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit("page-changed", this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("page-changed", this.currentPage + 1);
      }
    },
  },
};
</script>
