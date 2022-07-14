const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[id].bundle.[fullhash].min.js",
    publicPath: "/microfrontend/login/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "signin",
      library: { type: "var" , name: "signin" },
      filename: "signin.min.js",
      remotes: {
        utils: "appshell",
      },
      exposes: {
        "./Signin": "./src/signin.js",
      },
      shared: {
        svelte: { singleton: true },
        "single-spa-svelte": { singleton: true },
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
        test: /\.(js)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
        },
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8000,
  },
};
