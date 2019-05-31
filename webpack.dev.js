const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "/build"),
    hot: false,
    port: 5000,
    host: "0.0.0.0",
    publicPath:'/',
    compress:true,
    historyApiFallback: true,
    proxy: {
      '/proxy': {
          target: 'http://your_api_server.com',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin()
  ]
});
