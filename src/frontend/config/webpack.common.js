var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AppCachePlugin = require('appcache-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'app': './src/app/main.ts'
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
          } , 
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      { // FontAwesome
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader",
          query: {
            limit: 10000,
            mimetype: "application/font-woff"
          }
      },
      { // FontAwesome
          test: /\.(jpg|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
      },
      { 
          test: /\.ico.png$/, 
          use: [ "url-loader?mimetype=image/png" ] 
      },
      {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: helpers.root('src','assets')
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              loader: ['css-loader', 'sass-loader']
          }),
          include: helpers.root('src','assets')
      },
      {
          test: /\.(jade|pug)$/,
          use: ['html-loader?attrs=link:href img:src', 'pug-html-loader']
      },
      {
          test: /manifest.json$/,
          loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
      }
    ]
  },
  
  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular([\\\/])core([\\\/])@angular/,
      helpers.root('./src'),
      {}
    ), 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/app/template.pug'
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