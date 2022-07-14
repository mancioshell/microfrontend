<template>
  <div class="col-sm-2 col-md-3 mb-4">
    <div class="card h-100">
      <div class="card-thumbnail">
        <img
          :src="`/microfrontend/products/img/${product.img}.png`"
          class="img-fluid px-5 py-5"
          :alt="`${product.img}`"
        />
      </div>

      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <p class="card-text">{{ product.price }} $</p>
        <a href="" @click="addToCart" class="btn btn-primary">
          <i class="fas fa-cart-plus"></i> Aggiungi
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return { name: "", description: "", price: 0 };
      },
    },
  },
  mounted() {},
  methods: {
    addToCart(e) {
      e.preventDefault();
      this.$emit("addToCart", this.product);
    },
  },
};
</script>
