// This file isn't transpiled, so must use CommonJS and ES5

// Register babel to transpile the tests before the tests run.
require('babel-register')();

// Disable webpack features that Mocha doesn't understand.
// The require .css is webpack specific. Treat as empty function
require.extensions['css'] = function() {};
