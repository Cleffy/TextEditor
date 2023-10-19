const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

/**
 * @description Webpack configuration
 * @returns 
 */
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    new GenerateSW(),
    new WebpackPwaManifest({
      name: 'Text Editor',
      short_name: 'Text Editor',
      description: 'A simple text editor',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('assets/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ]
    }),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime']
            }
          }
        }
      ]
    }
  };
};
