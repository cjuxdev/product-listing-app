import { createStore } from "vuex";

export default createStore({
  state: {
    selectedType: "men",
    cart: [],
  },
  getters: {
    selectedType: (state) => state.selectedType,
    cartItems: (state) => state.cart,
    cartItemCount: (state) => state.cart.length,
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price, 0);
    },
  },
  mutations: {
    setSelectedType(state, type) {
      state.selectedType = type;
    },
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
  },
  actions: {
    updateSelectedType({ commit }, type) {
      commit("setSelectedType", type);
    },
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
  },
  modules: {},
});
