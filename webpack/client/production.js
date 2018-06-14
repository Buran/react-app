const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: [
    './main.jsx'
  ],

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin('./public', { root: path.resolve(__dirname, '../') }),
  ].filter(Boolean),
};

