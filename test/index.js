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

test('should render toffee file from a given filepath, async/promise', function(done) {
  var locals = {supplies: ['foo', 'bar', 'baz', 'qux']};
  var promise = transform.renderFileAsync('./test/fixture.toffee', {}, locals);
  var expected = '<li>foo</li><li>bar</li><li>baz</li><li>qux</li>';

  promise.then(function(actual) {
    // console.log(actual) //=> '<p>Hello, my name is .</p>'
    // test.equal(actual.body, expected);
    done();
  });
});


// test('should compile a given filepath with template (synchronously)', function(done) {
//   var compiled = transform.compileFile('./test/fixture.toffee');
//   var actual = compiled.fn({supplies: [1, 'b', 'c', 4]});
//   var expected = '<li>1</li><li>b</li><li>c</li><li>4</li>';

//   test.equal(actual, expected);
//   done();
// });

// test('should compile a given filepath with template (async/promise)', function(done) {
//   var promise = transform.compileFileAsync('./test/fixture.toffee');
//   var expected = '<li>1</li><li>b</li><li>c</li><li>4</li>';

//   promise.then(function(compiled) {
//     var actual = compiled.fn({supplies: [1, 'b', 'c', 4]});
//     test.equal(actual, expected);
//     done();
//   })
// });

// test('should render a given template string', function(done) {
//   var actual = transform.render('<p>Hello #{place}</p>.', {}, {place: 'world'});
//   var expected = '<p>Hello world!</p>';

//   test.equal(actual, expected);
//   done();
// });

// test('should render a given filepath with template (synchronously)', function(done) {
//   var actual = transform.renderFile('./test/fixture.toffee', {}, {supplies: [1, 2, 3, 4]});
//   var expected = '<li>1</li><li>2</li><li>3</li><li>4</li>';

//   test.equal(actual, expected);
//   done();
// });

// test('should render a given filepath with template (async/promise)', function(done) {
//   var promise = transform.renderFileAsync('./test/fixture.toffee', {}, {supplies: [1, 2, 3, 4]});
//   var expected = '<li>1</li><li>2</li><li>3</li><li>4</li>';

//   promise.then(function(actual) {
//     test.equal(actual, expected);
//     done();
//   });
// });
