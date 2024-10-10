<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div
        class="container-fluid d-flex justify-content-between align-items-center navbar-container"
      >
        <!-- Left side: Menu items -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link"
                aria-current="page"
                :class="{ active: selectedType === 'men' }"
                @click="selectCategory('men')"
                href="#"
                >Men</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selectedType === 'women' }"
                @click="selectCategory('women')"
                href="#"
                >Women</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selectedType === 'new-featured' }"
                @click="selectCategory('new-featured')"
                href="#"
                >New & Featured</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: selectedType === 'gift' }"
                @click="selectCategory('gift')"
                href="#"
                >Gift</a
              >
            </li>
          </ul>
        </div>

        <!-- Center: Brand logo (positioned using absolute center) -->
        <a
          class="navbar-brand position-absolute start-50 translate-middle-x"
          href="#"
        >
          <img :src="logoSrc" alt="Brand" class="brand" />
        </a>

        <!-- Right side: Search icon, Cart icon, Login button -->
        <div class="d-flex align-items-center right-section">
          <a href="#" class="">
            <i class="bi bi-search"></i>
          </a>
          <a class="cart-con" @click.stop="toggleCartDropdown">
            <i class="bi bi-cart"></i>
            <span v-if="cartItemCount > 0" class="cart-count">{{
              cartItemCount
            }}</span>
            <!-- Cart dropdown -->
            <div
              v-if="isCartDropdownVisible"
              class="cart-dropdown"
              ref="cartDropDown"
            >
              <ul
                class="cart-items-list"
                :class="{ emptyCartList: cartItems.length === 0 }"
              >
                <li v-if="cartItems.length === 0" class="empty-cart">
                  <p>Your cart is empty.</p>
                </li>
                <li
                  v-for="item in cartItems"
                  :key="item.id"
                  class="cart-item text-start"
                >
                  <div class="d-flex img-with-data">
                    <img
                      :src="item.image"
                      alt="Product Image"
                      class="thumbnail"
                    />
                    <div>
                      <p class="p-name">{{ item.name }}</p>

                      <div class="d-flex gap-2">
                        <span>
                          <label class="cart-lable">Size:</label>
                          {{ item.size }}</span
                        >
                        <span class="color-con">
                          <label class="cart-lable">Color:</label>
                          <div
                            class="color-box"
                            :style="{ backgroundColor: item.color }"
                          ></div>
                        </span>
                      </div>
                      <p>Price: ${{ item.price.toFixed(2) }}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="cart-total">
                <p>Total: ${{ cartTotal.toFixed(2) }}</p>
                <button v-if="cartTotal.toFixed(2) > 0" class="Pay-btn">
                  Checkout
                </button>
              </div>
            </div>
            <!-- Cart dropdown -->
          </a>
          <a href="#" class="login"> Login </a>
        </div>
      </div>
    </nav>
  </div>
  <div class="sub-title">
    <p>
      The Ultimate House of Luxury, defining style and creating desire, now and
      forever
    </p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      logoSrc: require("@/assets/img/TULOZ.png"),
      isCartDropdownVisible: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutsideB);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutsideB);
  },
  computed: {
    ...mapGetters(["cartItemCount", "cartItems", "cartTotal"]),
    ...mapState({
      selectedType: (state) => state.selectedType,
    }),
  },
  methods: {
    ...mapActions(["updateSelectedType"]),
    selectCategory(type) {
      //this.selectedType = type;
      this.updateSelectedType(type);
      this.$emit("category-selected", type);
    },
    toggleCartDropdown() {
      this.isCartDropdownVisible = !this.isCartDropdownVisible;
    },
    handleClickOutsideB(event) {
      const cartDropDown = this.$refs.cartDropDown;
      if (cartDropDown && !cartDropDown.contains(event.target)) {
        this.isCartDropdownVisible = false;
      }
    },
  },
};
</script>
