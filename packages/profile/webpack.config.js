const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.[fullhash].min.js",
    publicPath: "/microfrontend/profile/",
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      library: { type: "var", name: "profile" },
      filename: "profile.min.js",
      remotes: {
        cart: "cart",
        utils: "appshell",
      },
      exposes: {
        "./Profile": "./src/profile-init.js",
      },
      shared: {
        angular: { singleton: true },
        "angular-route": { singleton: true },
        "single-spa": {
          singleton: true,
          eager: true
        },
        "single-spa-angularjs": { singleton: true },
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
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },

  // externals: {
  //   "single-spa": "single-spa",
  // },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8002,
  },
};
