<template>
  <div class="card">
    <div class="product-image">
      <!-- <img src="/mock-data/images/women-1.jpeg" /> -->
      <img :src="product.image" alt="Product Image" />
    </div>
    <div class="product-info">
      <!-- <div class="product-title">Clara long sleeve shirt</div>
      <div class="product-category">Wardrobe essentials</div>
      <div class="product-price">$ 78 . 00</div> -->
      <div class="product-title">{{ product.name }}</div>
      <div class="product-category">{{ product.category }}</div>
      <div class="product-price">{{ product.price }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
