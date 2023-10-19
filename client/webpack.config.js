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
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      // Webpack plugin to generate HTML file
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor'
      }),

      // Custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Webpack plugin to generate manifest.json
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'Text Editor',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]
      }),
    ],
    
    module: {
      // Asset loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
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
