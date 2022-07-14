const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "js/[name].bundle.[fullhash].min.js",
    publicPath: "/dist",
  },

  plugins: [
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
    new CopyPlugin({
      patterns: [
        { from: "slides", to: "slides" },
        { from: "images", to: "images" },
      ],
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
    port: 8080,
  },
};
