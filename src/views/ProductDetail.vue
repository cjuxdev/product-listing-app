<template>
  <div class="product-detail">
    <SaleBar />
    <div class="content-wrapper">
      <NavBar />
      <div class="row detail-area">
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-4">
              <div class="side-img-1 col-lg-12">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="side-img-2 col-lg-12">
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
            <div class="old-price">$ 200.00</div>
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
          <div class="btn-area">
            <button class="addToCart">Add to Cart</button>
            <button class="favorite"><span class="icon-hart"></span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import SaleBar from "@/components/SaleBar.vue";
import NavBar from "@/components/NavBar.vue";
import productService from "@/services/productService.js";

import ColorPicker from "@/components/ColorPicker.vue";
import SizePicker from "@/components/SizePicker.vue";

export default {
  name: "ProductDetail",
  props: ["id"],
  components: {
    SaleBar,
    NavBar,
    ColorPicker,
    SizePicker,
  },
  data() {
    return {
      product: {},
      selectedColor: null,
    };
  },
  computed: {
    ...mapGetters(["selectedType"]), // Access the selectedType in product detail
    formattedPrice() {
      return this.product.price ? this.product.price.toFixed(2) : "0.00";
    },
  },
  async created() {
    // Fetch the product details using the ID
    this.product = await productService.getProductById(this.id);
  },
  methods: {
    updateSelectedColor(color) {
      // Handle the color selected by the user
      this.selectedColor = color;
    },
    updateSelectedSize(size) {
      // Handle the size selected by the user
      this.selectedSize = size;
    },
  },
};
</script>
