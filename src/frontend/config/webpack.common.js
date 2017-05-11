var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'app': './src/main.ts'
  },
  output:{
      path: helpers.root('../web/dist'),
      publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: "file-loader"
      },      
      {
          test: /\.shadow.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: ['css-loader', 'sass-loader']
          }),
          include: /styles/
      },
      {
          test: /\.(jade|pug)$/,
          use: ['raw-loader', 'pug-html-loader']
      }      
        
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ), 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),

    new AppCachePlugin({
      cache: [
          "/assets/favicon/favicon-16x16.png",
          "/assets/favicon/favicon-32x32.png"
      ],
      network: ["*"],
      settings: ['prefer-online'],
      exclude: [],
      output: 'cache.manifest'
    })
  ]
};

