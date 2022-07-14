<template>
  <main id="main">
      <div>Product Detail</div>
  </main>
</template>

<script>


export default {
  // components: {
  //   TfsObjectState,
  // },
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    const productId = this.$route.params.productId;

    // doAjax("GET", this.getURI(`/teams/${productId}`), [], {
    //   "Content-Type": "application/json",
    // }).then((response) => {
    //   this.team = response.data;
    // });
  },
  methods: {
    getURI(path) {
      let apiPath = "/api";
      const uri = `${apiPath}${path}?v=${Date.now()}`;
      return uri;
    },
    addToCart() {      
    },
  },
};
</script>
