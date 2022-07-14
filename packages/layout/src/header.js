import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";

import singleSpaReact from "single-spa-react";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Header,
  errorBoundary(err, info, props) {
    return <div>This renders when a catastrophic error occurs</div>;
  },
  //domElementGetter: () => document.getElementById("header"),
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
