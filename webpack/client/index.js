const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = function (env, options) {
  const mode = (env && env.production && 'production') || options.mode || 'production';
  const extended = require('./' + mode);

  const config = {
    context: path.join(__dirname, 'src'),
    mode: mode,
    target: 'web',

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },

    resolve: {
      extensions: ['.js', '.jsx']
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          },
        }
      ]
    },

    plugins: [
      mode === 'development' ? new webpack.NamedModulesPlugin() : new webpack.HashedModuleIdsPlugin(),
    ]
  };

  return merge(config, extended);
};
