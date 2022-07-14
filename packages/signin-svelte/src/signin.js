import singleSpaSvelte from "single-spa-svelte";
import Signin from "./Signin.svelte";

const svelteLifecycles = singleSpaSvelte({
  component: Signin
});

export const bootstrap = svelteLifecycles.bootstrap;
export const mount = svelteLifecycles.mount;
export const unmount = svelteLifecycles.unmount;