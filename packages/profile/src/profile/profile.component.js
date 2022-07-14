"use strict";

class Profile {
  constructor($log) {
    this.$log = $log;
  }
}

export default {
  bindings: {},
  controller: Profile,
  controllerAs: "vm",
  template: require("./profile.html").default,
};
