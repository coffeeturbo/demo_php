const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devConfig = require('./webpack.dev.js');
const commonConfig = require('./webpack.common.js');

module.exports = [
    devConfig, 
    webpackMerge(commonConfig, {
        devtool: 'source-map',
    
        entry: './app/server.ts',
        output: {
            filename: 'server.js'
        },
        target: 'node', // solves error: fs not found
        plugins: [
            new ExtractTextPlugin('[name].css')
        ]
    })
];