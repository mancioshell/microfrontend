import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap";
import "@fortawesome/fontawesome-free";

import "core-js/stable";
import "regenerator-runtime/runtime";

import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const imports = {
  header: () => import("layout/Header"),
  footer: () => import("layout/Footer"),
  products: () => import("products/Products"),
  checkout: () => import("checkout/Checkout"),
  profile: () => import("profile/Profile"),
  signin: () => import("signin/Signin"),
};

const routes = constructRoutes(document.querySelector("#single-spa-layout"));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return imports[name]();
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });
layoutEngine.activate();

applications.forEach(registerApplication);

start();
