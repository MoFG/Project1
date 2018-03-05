'use strict'

var waterfall = require('run-waterfall')
var toArray = require('to-array')

module.exports = AsyncPipe

function AsyncPipe (fns) {
  fns = Array.isArray(fns) ? fns.slice() : toArray(arguments)

  return function asyncPipe (value, callback) {
    waterfall([init].concat(fns), callback || noop)

    function init (callback) {
      callback(null, value)
    }
  }
}

function noop () {}
