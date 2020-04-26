# jstransformer-toffee

[Toffee](https://github.com/malgorithms/toffee) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-toffee/master.svg)](https://travis-ci.org/jstransformers/jstransformer-toffee)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-toffee/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-toffee)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-toffee/master.svg)](http://david-dm.org/jstransformers/jstransformer-toffee)

[![NPM version](https://img.shields.io/npm/v/jstransformer-toffee.svg)](https://www.npmjs.org/package/jstransformer-toffee)

## Installation

    npm install jstransformer-toffee

## API

```js
var toffee = require('jstransformer')(require('jstransformer-toffee'));
var opts = {};

toffee.render('<h1>Hello #{place}!</h1>', opts, {place: 'world'}).body;
//=> '<h1>Hello world!</h1>'

var promise = toffee.renderFileAsync('./path/to/hello.toffee', opts, {place: 'world'});
promise.then(function(data) {
  console.log(data.body);
  //=> '<h1>Hello world!</h1>'
});
```

## License

MIT
