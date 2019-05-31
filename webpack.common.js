const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const webpack = require("webpack");

const publicPath = "/";

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "static/js/[name].[hash:8].js",
    publicPath,
    chunkFilename: 'chunks/js/[name].[hash:8].chunk.js'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("postcss-import"), require("autoprefixer")]
            }
          },
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf|webp|ttf|jpg|png|svg|jpeg)$/i,
        use: [{
          loader:'url-loader',
          options: {
          limit: 8192,
          name: "asset/font/[name].[hash:8].[ext]",
          publicPath,
          }
        }],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      chunks: ["vendors", "commons", "index"]
    }),
    new CopyWebpackPlugin([{from:'public'}]),
    //解决moment打包的时候把所有的语言都打包进去的问题
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
