<template>
  <Parcel
    v-on:parcelMounted="parcelMounted()"
    v-on:parcelUpdated="parcelUpdated()"
    :config="parcelConfig"
    :mountParcel="mountParcel"
  />
</template>

<script>
import Parcel from "single-spa-vue/parcel";

import { mountRootParcel } from "single-spa";

export default {
  components: {
    Parcel,
  },
  data() {
    return {
      parcelConfig: import("cart/Cart"),
      mountParcel: mountRootParcel,
    };
  },
  methods: {
    parcelMounted() {},
    parcelUpdated() {},
  },
};
</script>
