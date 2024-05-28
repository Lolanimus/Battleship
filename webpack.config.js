/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
    // Runtime code for hot module replacement
    hot: "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: false,
    client: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Battleship",
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
