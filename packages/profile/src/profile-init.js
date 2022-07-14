import singleSpaAngularJS from "single-spa-angularjs";
import angular from "angular";

import "./app";

const ngLifecycles = singleSpaAngularJS({
  angular: angular,
  mainAngularModule: "app",
  uiRouter: false,
  strictDi: true,
  preserveGlobal: false,
  template: "<profile-component />",
  //domElementGetter: () => document.getElementById("app"),
});

export const bootstrap = ngLifecycles.bootstrap;
export const mount = ngLifecycles.mount;
export const unmount = ngLifecycles.unmount;
