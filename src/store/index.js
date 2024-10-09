import { createStore } from "vuex";

export default createStore({
  state: {
    selectedType: "men",
  },
  getters: {
    selectedType: (state) => state.selectedType,
  },
  mutations: {
    setSelectedType(state, type) {
      state.selectedType = type;
    },
  },
  actions: {
    updateSelectedType({ commit }, type) {
      commit("setSelectedType", type);
    },
  },
  modules: {},
});
