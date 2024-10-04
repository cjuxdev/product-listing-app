import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/LandingPage.vue";
import ProductDetail from "../views/ProductDetail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
