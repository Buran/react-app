const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = function (env, options) {
  const mode = (env && env.production && 'production') || options.mode || 'production';
  const specificConfig = require('./webpack/' + mode);

  let config = {
    context: path.join(__dirname, 'src'),
    mode: mode,
    devtool: 'none',
    entry: './main.js',

    module: {
      rules: [
        {
          test: /\.js?$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          },
          exclude: /node_modules/
        }
      ]
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'React Bootcamp',
        hash: true,
        template: path.resolve(__dirname, './src/index.html')
      })
    ]
  };

  return merge(config, specificConfig);
};
