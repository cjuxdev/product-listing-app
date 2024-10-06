<template>
  <div class="landingPage">
    <SaleBar />
    <NavBar />
  </div>
</template>

<script>
// @ is an alias to /src
import SaleBar from "@/components/SaleBar.vue";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "LandingPage",
  components: {
    SaleBar,
    NavBar,
  },
};
</script>
