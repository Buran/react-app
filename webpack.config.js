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
    entry: './main.jsx',

    module: {
      rules: [
        {
          test: /\.jsx?$/,
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

    resolve: {
      extensions: ['.js', '.jsx']
    },

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
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
