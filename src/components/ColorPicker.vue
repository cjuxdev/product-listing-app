<template>
  <div class="color-picker">
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="color-box"
      @click="selectColor(color)"
      :class="{ selected: selectedColor === color }"
    >
      <div class="innner" :style="{ backgroundColor: color }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedColor: null,
    };
  },
  methods: {
    selectColor(color) {
      this.selectedColor = color;
      this.$emit("color-selected", color);
    },
  },
};
</script>
