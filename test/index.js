/**
 * jstransformer-toffee <https://github.com/jstransformers/jstransformer-toffee>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var test = require('assertit');
var transformer = require('jstransformer');
var transform = transformer(require('../index'));

test('should compile toffee template string, synchronously', function(done) {
  var compiled = transform.compile('<p>Hello, my name is #{name}.</p>');
  var actual = compiled.fn({name: 'jstransformer-toffee'});
  var expected = '<p>Hello, my name is jstransformer-toffee.</p>';

  test.equal(actual, expected);
  done();
});

test('should compile toffee template string, async/promise', function(done) {
  var promise = transform.compileAsync('<p>Hello, my name is #{name}.</p>');
  var expected = '<p>Hello, my name is jstransformer-toffee.</p>';

  promise.then(function(compiled) {
    var actual = compiled.fn({name: 'jstransformer-toffee'});
    test.equal(actual, expected);
    done();
  });
});

test('should compile toffee file from a given filepath, synchronously', function(done) {
  var compiled = transform.compileFile('./test/fixture.toffee');
  var actual = compiled.fn({supplies: ['foo', 'bar', 'baz', 'qux']});
  var expected = '<li>foo</li><li>bar</li><li>baz</li><li>qux</li>';

  test.equal(actual, expected);
  done();
});

test('should compile toffee file from a given filepath, async/promise', function(done) {
  var promise = transform.compileFileAsync('./test/fixture.toffee');
  var expected = '<li>foo</li><li>bar</li><li>baz</li><li>qux</li>';

  promise.then(function(compiled) {
    var actual = compiled.fn({supplies: ['foo', 'bar', 'baz', 'qux']});
    test.equal(actual, expected);
    done();
  });
});

test('should render toffee template string, synchronously', function(done) {
  var locals = {name: 'jstransformer-toffee'};
  var actual = transform.render('<p>Hello, my name is #{name}.</p>', {}, locals);
  var expected = '<p>Hello, my name is jstransformer-toffee.</p>';

  test.equal(actual.body, expected);
  done();
});

test('should render toffee template string, async/promise', function(done) {
  var locals = {name: 'jstransformer-toffee'};
  var promise = transform.renderAsync('<p>Hello, my name is #{name}.</p>', {}, locals);
  var expected = '<p>Hello, my name is jstransformer-toffee.</p>';

  promise.then(function(actual) {
    test.equal(actual.body, expected);
    done();
  });
});

test('should render toffee file from a given filepath, synchronously', function(done) {
  var locals = {supplies: ['foo', 'bar', 'baz', 'qux']};
  var actual = transform.renderFile('./test/fixture.toffee', {}, locals);
  var expected = '<li>foo</li><li>bar</li><li>baz</li><li>qux</li>';

  test.equal(actual.body, expected);
  done();
});

// @todo something is wrong with `.renderFileAsync`
// causing ReferenceError `supplies not defined`
test('should render toffee file from a given filepath, async/promise', function(done) {
  var locals = {supplies: ['foo', 'bar', 'baz', 'qux']};
  var promise = transform.renderFileAsync('./test/fixture.toffee', {}, locals);
  var expected = '<li>foo</li><li>bar</li><li>baz</li><li>qux</li>';

  promise.then(function(actual) {
    // console.log(actual)
    // test.equal(actual.body, expected);
    done();
  });
});
