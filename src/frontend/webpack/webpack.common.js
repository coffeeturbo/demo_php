const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const helpers = require('./helpers');
const ngtools = require('@ngtools/webpack');
const dotenv = require('dotenv').config().parsed;

const ENV = process.env.ENV = process.env.ENV = helpers.isDev ? 'development' : 'production';
const IS_NODE = process.env.IS_NODE = helpers.isServer;
const HOST = helpers.isServer ? "http://nginx:8080" : "";

module.exports = {
    entry: {
        'app': './app/main.ts'
    },
    output:{
        path: helpers.root('../web/dist'),
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [ helpers.root("node_modules") ]
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                // test: /\.ts$/,
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
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
                test: /\.(jpg|png|ttf|eot|svg|mp3)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.ico.png$/,
                use: [ "url-loader?mimetype=image/png" ]
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: helpers.root('assets')
            },
            {
                test: /\.scss$/,
                use: [
                    'to-string-loader',
                    {
                        "loader":"css-loader",
                        "options": { "minimize": !helpers.isDev}
                    },
                    'sass-loader'
                ],
                exclude: helpers.root('assets')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            "loader":"css-loader",
                            "options": { "minimize": !helpers.isDev}
                        },
                        'sass-loader'
                    ]
                }),
                include: helpers.root('assets')
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
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'IS_NODE': JSON.stringify(IS_NODE),
                'HOST': JSON.stringify(HOST),
                'dotenv': JSON.stringify(dotenv)
            }
        }),
        new ngtools.AngularCompilerPlugin({
            tsConfigPath: helpers.root("tsconfig.json"),
            skipCodeGeneration: helpers.isDev || helpers.isServer,
            entryModule: helpers.root(
                "modules",
                "Application",
                helpers.isServer ? "ApplicationModuleServer#ApplicationModuleServer" : "ApplicationModuleBrowser#ApplicationModuleBrowser"
            )
        }),

        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            /angular([\\\/])core([\\\/])@angular/,
            helpers.root('.'),
            {}
        ),

        // new webpack.optimize.CommonsChunkPlugin({
        //   name: ['app', 'vendor', 'polyfills']
        // }),

        new HtmlWebpackPlugin({
            template: 'app/template.pug'
        }),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/), // load only this langs in momentjs
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