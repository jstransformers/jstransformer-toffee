'use strict';

var toffee = require('toffee');

exports.name = 'toffee';
exports.outputFormat = 'html';

exports.compile = function _compile(str, options) {
  return toffee.compile(str, options);
};

exports.render = function _render(str, options, locals) {
  var renderer = exports.compile(str, options);
  return renderer(locals);
};
