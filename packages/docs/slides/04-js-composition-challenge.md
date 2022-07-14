### JS Composition Challenge

- First Level Routing <!-- .element: class="fragment fade-in" -->
- Dynamic Import <!-- .element: class="fragment fade-in" -->
- Shared Dependencies  <!-- .element: class="fragment fade-in" -->
- Component Loading <!-- .element: class="fragment fade-in" -->

---

#### First Level Routing

![First Level Routing](dist/images/first-level-routing.png) <!-- .element height="80%" width="80%" -->

---

#### First Level Routing

- Routing Library (e.g. React + React Router DOM) <!-- .element: class="fragment fade-in" -->

```js
import React from "react";
import { BrowserRouter Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/mf1">
            <MF1 />
          </Route>
          <Route path="/mf2">
            <MF2 />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

<!-- .element: class="fragment fade-in" -->

---

#### First Level Routing

- Single SPA <!-- .element: class="fragment fade-in" -->

```js
import { registerApplication, start } from "single-spa";

registerApplication(
  "mf1",
  () => System.import("mf1"),
  (location) => location.pathname.startsWith("mf1")
);

registerApplication(
  "mf2",
  () => System.import("mf2"),
  (location) => location.pathname.startsWith("mf2")
);

start();
```

<!-- .element: class="fragment fade-in" -->

---

#### Dynamic Import - Benefits

- Conditional loading <!-- .element: class="fragment fade-in" -->
- Code Splitting <!-- .element: class="fragment fade-in" -->
- Lazy Loading <!-- .element: class="fragment fade-in" -->

---

#### Dynamic Import - ES2020

```js
import("/modules/my-module.js").then((module) => {
  // Do something with the module.
});
```

<!-- .element: class="fragment fade-in" -->

```js
let module = await import("/modules/my-module.js");
```

<!-- .element: class="fragment fade-in" -->

- Not Supported in IE 11 <!-- .element: class="fragment fade-in" -->

---

#### Dynamic Import - Webpack vs SystemJS

![Webpack vs SystemJS](dist/images/webpack-system.png) <!-- .element height="80%" width="80%" -->

---

#### Shared Dependencies - Webpack vs SystemJS

![Webpack vs SystemJS](dist/images/shared-dependencies.png) <!-- .element height="80%" width="80%" -->

---

#### Module Federation

![Module Federation](dist/images/module-federation.png) <!-- .element height="80%" width="80%" -->

---

#### Module Federation

- Sharing code and dependencies between two different application <!-- .element: class="fragment fade-in" -->
- Dynamically Code Loading <!-- .element: class="fragment fade-in" -->
- Less Code Duplication <!-- .element: class="fragment fade-in" -->

Note:
Con MF si possono condividere MicroFrontend, Librerie di Utilità e Componenti

---

#### Module Federation - App Shell

```js
  new ModuleFederationPlugin({
    name: "appshell",
    library: { type: "var", name: "appshell" },
    filename: "appshell.min.js",
    remotes: {
      layout: "layout",
      signin: "signin",
      products: "products",
      profile: "profile",
      checkout: "checkout",
    },    
    ...    
    ... 
    ... 
    shared: {
      "single-spa": { singleton: true },
      rxjs: { singleton: true }
    },
  })
```

---

#### Module Federation - Layout

```js
   new ModuleFederationPlugin({
    name: "layout",
    library: { type: "var", name: "layout" },
    filename: "layout.min.js",
    remotes: {},
    exposes: {
      "./Header": "./src/header.js",
      "./Footer": "./src/footer.js",
    },
    ...
    ...
    ...
    shared: {
      react: { singleton: true },
      "react-dom": { singleton: true },
      "react-router-dom": { singleton: true },
      "single-spa-react": { singleton: true },
    },
  })
```

---

#### Module Federation 

```js
  proxy: {
           [`/microfrontend/layout`]: {  target: `http://localhost:8006` }
  }
  
```

```html
  <script defer src="/dist/appshell.min.js"></script>
  <script defer src="/microfrontend/layout/layout.min.js"></script>
  <script defer src="/microfrontend/cart/cart.min.js"></script>
  <script defer src="/microfrontend/login/signin.min.js"></script>
  <script defer src="/microfrontend/products/products.min.js"></script>
  <script defer src="/microfrontend/profile/profile.min.js"></script>
  <script defer src="/microfrontend/checkout/checkout.min.js"></script>
```

---

#### Component Loading - App Shell

```js
import { registerApplication, start } from "single-spa";

registerApplication(
  "footer",
  () => import("layout/Footer"),
  true
);

start();
```
<!-- .element: class="fragment fade-in" -->

```js
import React from "react";
import ReactDOM from "react-dom";
import Footer from "./Footer.jsx";
import singleSpaReact from "single-spa-react";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Footer  
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
```
<!-- .element: class="fragment fade-in" -->

---

#### Component Loading - React

```js
// before
import OtherComponent from "./OtherComponent";

// after
const OtherComponent = React.lazy(() => import("./OtherComponent"));
```

<!-- .element: class="fragment fade-in" -->

---

#### Component Loading - Angular

```js
const routes: Routes = [
  {
    path: "items",
    loadChildren: () =>
      import("./items/items.module").then((m) => m.ItemsModule),
  },
];
```

<!-- .element: class="fragment fade-in" -->

---

#### Component Loading - Vue

```js
Vue.component(
  "async-webpack-example",
  // A dynamic import returns a Promise.
  () => import("./my-async-component")
);
```

<!-- .element: class="fragment fade-in" -->

---

#### Component Loading - AngularJS

- Third-party lib: oclazyload <!-- .element: class="fragment fade-in" -->

```js
var myApp = angular.module("MyApp", ["oc.lazyLoad"]);

myApp.controller("MyCtrl", function ($ocLazyLoad) {
  $ocLazyLoad.load("testModule.js");
});
```

<!-- .element: class="fragment fade-in" -->

---

#### Component Loading - Multi Framework

![Mess](dist/images/its-all-a-mess.jpg) <!-- .element height="80%" width="80%" class="fragment fade-in" -->

---

#### Component Loading - Multi Framework

- Single SPA to the rescue! <!-- .element: class="fragment fade-in" -->

![SingleSpa](dist/images/single-spa.jpg) <!-- .element height="60%" width="60%" class="fragment fade-in" -->

---

#### Single SPA - Parcel

- Framework agnostic component <!-- .element: class="fragment fade-in" -->
- Handle Microfrontend Lifecycle  <!-- .element: class="fragment fade-in" -->
- Mounted through a Parcel Component <!-- .element: class="fragment fade-in" -->

---

#### Single SPA - React Config

```js
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import MyParcelComponent from "./my-parcel-component.component.js";
export const MyParcel = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: MyParcelComponent,
});
```

<!-- .element: class="fragment fade-in" -->

---

#### Single SPA - React Mount

```js
import Parcel from 'single-spa-react/parcel'
import { MyParcel } from './myparcel.js'

export class myComponent extends React.Component {
  render () {
    return (
      <Parcel
        config={MyParcel}
        { /* optional props */ }
        { /* and any extra props you want here */ }
      />
    )
  }
}
```

<!-- .element: class="fragment fade-in" -->

---

#### Microfrontend - Chosen Approach

![Chosen Approach](dist/images/chosen-approach.png) <!-- .element height="80%" width="80%" class="fragment fade-in" -->
