<template>
  <div class="landingPage">
    <SaleBar />
  </div>
</template>

<script>
// @ is an alias to /src
import SaleBar from "@/components/SaleBar.vue";

export default {
  name: "LandingPage",
  components: {
    SaleBar,
  },
};
</script>
