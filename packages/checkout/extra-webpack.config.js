const webpack = require("webpack");
const path = require("path");

const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  config.optimization.runtimeChunk = false;
  config.output.publicPath = "/microfrontend/checkout/";

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "checkout",
      library: { type: "var", name: "checkout" },
      filename: "checkout.min.js",      
      exposes: {
        "./Checkout": "./src/main.single-spa.ts",
      },
      remotes: {
        cart: "cart",
        appshell: "appshell",
      },
      shared: {
        "single-spa": {
          singleton: true,
          eager: true
        },
        "single-spa-angular": {
          singleton: true,
        },
        "@angular/core": { singleton: true, eager: true },
        "@angular/common": {
          singleton: true,
          eager: true,
          strictVersion: true,
          requiredVersion: "12.2.16",
        },
        "@angular/forms": { singleton: true, eager: true },
        "@angular/platform-browser": {
          singleton: true,
          eager: true,
        },
        "@angular/platform-browser-dynamic": {
          singleton: true,
          eager: true,
        },
        "@angular/router": {
          singleton: true,
          eager: true,
        },
        // rxjs: { singleton: true, eager: true },
        "zone-js": { singleton: true, eager: true },
      },
    })
  );

  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
