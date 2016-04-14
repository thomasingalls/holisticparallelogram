/*
This file allows ES2015 syntax to be used on the server-side, and serves as the
entry point for the server code. Babel compiles server.js dependencies to ES5.
ES2015 is used on the server for initializing the Redux state and sending the
index page to the client.

https://babeljs.io/docs/usage/require/
*/

require('babel-register');
var scenicApp = require('./server.js');
