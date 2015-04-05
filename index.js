/**
 * jstransformer-toffee <https://github.com/jstransformers/jstransformer-toffee>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
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
