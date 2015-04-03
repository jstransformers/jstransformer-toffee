/**
 * jstransformer-toffee <https://github.com/tunnckoCore/jstransformer-toffee>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var toffee = require('toffee');
var bluebird = require('bluebird');
var readFile = bluebird.promisify(fs.readFile);
var readFileSync = fs.readFileSync;

exports.name = 'toffee';
exports.outputFormat = 'text';

exports.compile = toffee.compile;
exports.compileFile = function _compileFile(filepath, opts) {
  var input = readFileSync(path.resolve(filepath), 'utf8');
  return exports.compile(input, opts);
};
exports.compileFileAsync = function _compileFile(filepath, opts) {
  return readFile(path.resolve(filepath), 'utf8').then(function _then(data) {
    return exports.compile(data, opts)
  });
};
exports.render = function _render(str, locals, opts) {
  var renderer = exports.compile(str, opts);
  return renderer(locals);
};
exports.renderFile = function _renderFile(filepath, locals, opts) {
  var renderer = exports.compileFile(filepath, opts);
  return renderer(locals);
};
exports.renderFileAsync = function _renderFileAsync(filepath, locals, opts) {
  var renderer = exports.compileFileAsync(filepath, opts);

  return renderer.then(function(compiler) {
    return compiler(locals);
  })
};
