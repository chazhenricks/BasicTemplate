//This file isnt transpiles, so must use CommonJS and ES5

//Register Babel to transpile before our tests run
require('babel-register')();

//Disable webpack features that mocha doesnt understand
require.extensions['.css'] = function() {};

