import VueRouter from "vue-router";

import ProductList from "./views/ProductList.vue";
import ProductDetail from "./views/ProductDetail.vue";

const routes = [
  {
    path: `/products`,
    name: "productList",
    component: ProductList,
  },
  {
    path: `/products/:productId`,
    name: "product-detail",
    component: ProductDetail,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});
