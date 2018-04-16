'use strict'

const toffee = require('toffee')

exports.name = 'toffee'
exports.outputFormat = 'html'

exports.compile = function (str, options) {
  return toffee.compile(str, options)
}

exports.render = function (str, options, locals) {
  const renderer = exports.compile(str, options)
  return renderer(locals)
}
