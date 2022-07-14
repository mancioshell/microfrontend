const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.[fullhash].min.js",
    publicPath: "/microfrontend/products/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      library: { type: "var", name: "products" },
      filename: "products.min.js",
      remotes: {
        cart: "cart",
        utils: "appshell",
      },
      exposes: {
        "./Products": "./src/products.js",
      },
      shared: {
        vue: { singleton: true },
        "vue-router": { singleton: true },
        vuelidate: { singleton: true },
        "single-spa": {
          singleton: true,
          eager: true
        },
        "single-spa-vue": { singleton: true },
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
      verbose: true,
    }),
    new CopyPlugin({
      patterns: [{ from: "img", to: "img" }],
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: {
          loader: "vue-loader",
        },
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8001,
  },
};
