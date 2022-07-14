"use strict";

import { mountRootParcel } from "single-spa";
const parcelConfig = import("cart/Cart");

class ProfileDetails {
  constructor($log) {
    this.$log = $log;
  }

  $onInit() {
    this.profile = this.data;

    const parcel = mountRootParcel(parcelConfig, {
      domElement: document.getElementById("cart-parcel"),
    });

    this.parcel = parcel;
  }

  $onDestroy() {
    this.parcel.mountPromise.then(() => {
      if (this.parcel.getStatus() === "MOUNTED") {
        this.parcel.unmount();
      }
    });
  }
}

export default {
  bindings: {
    data: "<",
  },
  controller: ProfileDetails,
  controllerAs: "vm",
  template: require("./profile-details.html").default,
};
