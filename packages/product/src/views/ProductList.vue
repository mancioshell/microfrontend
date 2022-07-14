<template>
  <div class="row mt-5 mb-5">
    <div class="col-sm-6 col-md-8 offset-md-1">
      <div class="row">
        <product
          v-for="item in products"
          v-bind:product="item"
          v-bind:key="item.id"
          @addToCart="addToCart"
        ></product>
      </div>
    </div>
    <div class="col-sm-4 col-md-2">
      <Cart></Cart>
    </div>
  </div>
</template>

<script>
import Cart from "../components/Cart.vue";
import Product from "../components/Product.vue";

const module = import("utils/AjaxService");
const eventEmitterModule = import("utils/EventService");

export default {
  components: {
    Cart,
    Product,
  },
  data() {
    return {
      products: [],
      checkouts: [],
    };
  },
  async mounted() {
    const utils = await module;
    this.utils = utils;

    const eventEmitter = await eventEmitterModule;
    this.eventEmitter = eventEmitter.EventService;

    let result = await this.utils.doAjax("GET", "/api/products");
    this.products = result.data;

    result = await this.utils.doAjax("GET", "/api/checkouts");
    this.checkouts = result.data;
  },
  methods: {
    async addToCart(product) {
      let founded = this.checkouts.find((elem) => elem.id === product.id);

      if (founded) {        
        await this.utils.doAjax(
          "PUT",
          `/api/checkouts/${founded.id}`,
          {},
          {...founded, count: founded.count + 1}
        );
        this.eventEmitter.addProductToCart(founded);
      } else {
        product.count = 1;
        await this.utils.doAjax("POST", "/api/checkouts", {}, product);
        this.checkouts = this.checkouts.concat([product]);
        this.eventEmitter.addProductToCart(product);
      }
    },
  },
};
</script>
