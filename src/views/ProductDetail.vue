<template>
  <div class="product-detail">
    <SaleBar />
    <div class="content-wrapper">
      <NavBar />
      <div class="row detail-area">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-4 d-flex-sm">
              <div class="side-img-1 col-lg-12 col-sm-6">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="side-img-2 col-lg-12 col-sm-6">
                <img :src="product.image" :alt="product.name" />
              </div>
            </div>
            <div class="col-lg-8">
              <div class="side-img-3 col-lg-12">
                <img :src="product.image" :alt="product.name" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 info-area">
          <div class="title">
            <h2>{{ product.name }}</h2>
          </div>
          <div class="price">
            <div class="old-price">$ {{ formattedOldPrice }}</div>
            <div class="new-price">$ {{ formattedPrice }}</div>
          </div>
          <div class="discription">
            <p>{{ product.description }}</p>
          </div>
          <div class="colors">
            <h3>Colors</h3>
            <ColorPicker
              :colors="product.colors"
              @color-selected="updateSelectedColor"
            />
          </div>
          <div class="sizes">
            <div class="d-flex size-my">
              <h3>Sizes</h3>
              <h3 class="mySize">What’s my size</h3>
            </div>
            <SizePicker
              v-if="product.sizes && product.sizes.length"
              :sizes="product.sizes"
              @size-selected="updateSelectedSize"
            />
          </div>
          <div class="error-show" v-if="showError">
            <div class="alert alert-danger" role="alert">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-diamond-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
                />
              </svg>
              Please select a size and color
            </div>
          </div>
          <div class="btn-area">
            <button class="addToCart" @click="addToCart">Add to Cart</button>
            <button class="favorite"><span class="icon-hart"></span></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <CartModal
      :isVisible="isModalVisible"
      :productName="product.name"
      @close="isModalVisible = false"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SaleBar from "@/components/SaleBar.vue";
import NavBar from "@/components/NavBar.vue";
import productService from "@/services/productService.js";

import ColorPicker from "@/components/ColorPicker.vue";
import SizePicker from "@/components/SizePicker.vue";

import CartModal from "@/components/CartModal.vue";

export default {
  name: "ProductDetail",
  props: ["id"],
  components: {
    SaleBar,
    NavBar,
    ColorPicker,
    SizePicker,
    CartModal,
  },
  data() {
    return {
      product: {},
      selectedColor: null,
      selectedSize: null,
      isModalVisible: false,
      showError: false,
    };
  },
  computed: {
    ...mapGetters(["selectedType"]), // Access the selectedType in product detail
    formattedPrice() {
      return this.product.price ? this.product.price.toFixed(2) : "0.00";
    },
    formattedOldPrice() {
      return this.product.oldPrice ? this.product.oldPrice.toFixed(2) : "0.00";
    },
  },
  watch: {
    selectedColor() {
      this.checkSelections();
    },
    selectedSize() {
      this.checkSelections();
    },
  },
  async created() {
    // Fetch the product details using the ID
    this.product = await productService.getProductById(this.id);
  },
  methods: {
    ...mapActions(["addToCart"]),
    updateSelectedColor(color) {
      // Handle the color selected by the user
      this.selectedColor = color;
    },
    updateSelectedSize(size) {
      // Handle the size selected by the user
      this.selectedSize = size;
    },
    checkSelections() {
      if (this.selectedColor && this.selectedSize) {
        this.showError = false;
      }
    },
    addToCart() {
      // Ensure a size and color is selected before adding to cart
      if (!this.selectedColor || !this.selectedSize) {
        this.showError = true;
        return;
      }
      const productToAdd = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        color: this.selectedColor,
        size: this.selectedSize,
      };
      this.$store.dispatch("addToCart", productToAdd);
      this.isModalVisible = true;
    },
  },
};
</script>
