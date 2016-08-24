require('babel-register');
require('babel-polyfill');
require('./config/local.env.js');
//require('css-modules-require-hook')({
//    generateScopedName: '[path]_[local]_[hash:base64:4]',
//});

require('./server.js');





