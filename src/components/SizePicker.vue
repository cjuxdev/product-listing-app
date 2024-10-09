<template>
  <div class="size-picker">
    <div class="sizes">
      <!-- Loop through available sizes and display as buttons -->
      <button
        v-for="(size, index) in sizes"
        :key="index"
        :class="{ 'active-size': size === selectedSize }"
        @click="selectSize(size)"
        class="size-button"
      >
        {{ size }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SizePicker",
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedSize: null, // Store the selected size
    };
  },
  methods: {
    selectSize(size) {
      this.selectedSize = size; // Set the selected size
      this.$emit("size-selected", size); // Emit the selected size back to parent
    },
  },
};
</script>
