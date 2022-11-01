const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // adding the webpack plugin which will be used to inject our bundle into html
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE', //(Just another text editor)
      }),
      // this will inject the service worker form src-sw,js
      new InjectManifest({
        swSrc: './src-sw.js', //the source for service worker
        swDest: 'src-sw.js', //the destination name in dist directory
      }),
      // manifest.json file
      new WebpackPwaManifest({
        name: 'text-editor',
        short_name: 'jate',
        description: 'text editor that uses IndexedDB and can be used offline',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        fingerprints: false,
        inject: true,
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], //this is a range of different sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
