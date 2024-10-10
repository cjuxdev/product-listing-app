<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-contenter col-sm-10 col-lg-3">
      <div class="close">
        <img src="@/assets/img/close.png" @click="closeModal" />
      </div>
      <div class="title">
        <img src="@/assets/img/success.png" />
        <h3>Success</h3>
      </div>
      <h3 class="info">
        {{ productName }} has been added to your cart. You can continue shopping
        or proceed to checkout.
      </h3>
      <div class="button-group">
        <button @click="continueShopping" class="continue">
          Continue Shopping
        </button>
        <button @click="proceedToCheckout" class="proceed">Proceed</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    continueShopping() {
      this.$router.push("/");
    },
    proceedToCheckout() {
      console.log("Proceed to checkout clicked");
      this.$emit("close");
    },
  },
};
</script>
