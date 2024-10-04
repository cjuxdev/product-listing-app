<template>
  <div class="saleBar">
    <div class="container">
      Get 25% off this Summer Sale : Grab It Fast : 15H : 45M :12S
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  mounted() {
    // Ensure Bootstrap modal works after Vue has mounted the DOM
    const modal = new Modal(this.$refs.exampleModal);
    this.modalInstance = modal; // Store modal instance for use later
  },
  methods: {
    showModal() {
      if (this.modalInstance) {
        this.modalInstance.show(); // Ensure modal instance is properly initialized
      } else {
        console.error("Modal instance is not defined.");
      }
    },
  },
};
</script>
