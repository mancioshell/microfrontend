import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import singleSpaVue from "single-spa-vue";

import App from "./App.vue";

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

import router from "./router";

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render: (h) => h(App),
    //el: "#app",
    router,
  },
});

export const bootstrap = [vueLifecycles.bootstrap];
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
