/**
 * jstransformer-toffee <https://github.com/jstransformers/jstransformer-toffee>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict';

var test = require('testit');
var assert = require('assert');
var transformer = require('../index');

test('should compile a given template string', function(done) {
  var actual = transformer.compile('Hello #{place}!');
  var expected = 'function';

  assert.strictEqual(typeof actual, expected);

  actual = actual({place: 'world'});
  expected = 'Hello world!';

  assert.strictEqual(actual, expected);
  done();
});

test('should compile a given filepath with template (synchronously)', function(done) {
  var actual = transformer.compileFile('./test/fixture.toffee')({supplies: [1, 'b', 'c', 4]});
  var expected = '<li>1</li><li>b</li><li>c</li><li>4</li>';

  assert.strictEqual(actual, expected);
  done();
});

test('should compile a given filepath with template (async/promise)', function(done) {
  var promise = transformer.compileFileAsync('./test/fixture.toffee');
  var expected = '<li>1</li><li>b</li><li>c</li><li>4</li>';

  promise.then(function(compileFn) {
    var actual = compileFn({supplies: [1, 'b', 'c', 4]});
    assert.strictEqual(actual, expected);
    done();
  })
});

test('should render a given template string', function(done) {
  var actual = transformer.render('<li>#{supply}</li>', {supply: 'foo bar'});
  var expected = '<li>foo bar</li>';

  assert.strictEqual(actual, expected);
  done();
});

test('should render a given filepath with template (synchronously)', function(done) {
  var actual = transformer.renderFile('./test/fixture.toffee', {supplies: [1, 2, 3, 4]});
  var expected = '<li>1</li><li>2</li><li>3</li><li>4</li>';

  assert.strictEqual(actual, expected);
  done();
});

test('should render a given filepath with template (async/promise)', function(done) {
  var promise = transformer.renderFileAsync('./test/fixture.toffee', {supplies: [1, 2, 3, 4]});
  var expected = '<li>1</li><li>2</li><li>3</li><li>4</li>';

  promise.then(function(actual) {
    assert.strictEqual(actual, expected);
    done();
  });
});
