const path = require('path');
const _root = path.resolve(__dirname, '..');
const envArgv = require('yargs').argv.env || {};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}


const isServer = !!envArgv.server;
const isDev = !!envArgv.dev;
const isProd = !!envArgv.prod;

exports.root = root;
exports.isServer = isServer;
exports.isDev = isDev;
exports.isProd = isProd;