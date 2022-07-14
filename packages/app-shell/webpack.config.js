const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "js/[name].bundle.[fullhash].min.js",
    publicPath: "/dist",
  },

  plugins: [
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
      exposes: {
        "./AjaxService": "./src/ajax-service.js",
        "./EventService": "./src/event-service.js",
      },
      shared: {
        "single-spa": {
          singleton: true,
          eager: true
        },
        rxjs: { singleton: true, eager: true },
      },
    }),

    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: path.resolve(__dirname, "public/index.html"),
      template: path.resolve(__dirname, "templates/index.html"),
      inject: "body",
    }),
    new HtmlWebpackHarddiskPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].bundle.[fullhash].min.css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
      verbose: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|gif|png|PNG)$/,
        type: "asset/resource",
        generator: {
          filename: "img/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true,
    compress: true,
    open: true,
    port: 80,
    proxy: {
      [`/microfrontend/login`]: {
        target: `http://localhost:8000`,
      },
      [`/microfrontend/products`]: {
        target: `http://localhost:8001`,
      },
      [`/microfrontend/profile`]: {
        target: `http://localhost:8002`,
      },
      [`/microfrontend/checkout`]: {
        target: `http://localhost:8003`,
      },
      [`/microfrontend/cart`]: {
        target: `http://localhost:8005`,
      },
      [`/microfrontend/layout`]: {
        target: `http://localhost:8006`,
      },
      [`/api`]: {
        target: `http://localhost:3000`,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
