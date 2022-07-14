const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.[fullhash].min.js",
    publicPath: "/microfrontend/cart/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      library: { type: "var", name: "cart" },
      filename: "cart.min.js",
      remotes: {
        utils: "appshell",
      },
      exposes: {
        "./Cart": "./src/cart.js",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "single-spa-react": { singleton: true },
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
      verbose: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8005,
  },
};
