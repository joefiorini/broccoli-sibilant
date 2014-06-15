var broccoli = require('broccoli');
var pickFiles   = require('broccoli-static-compiler');
var broccoliSibilant = require('../index');

var tree = pickFiles('.', {
  srcDir: '/',
  files: ['test.sibilant'],
  destDir: '/'
});

module.exports = broccoliSibilant(tree);
