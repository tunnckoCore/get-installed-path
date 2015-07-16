/*!
 * get-installed-path <https://github.com/tunnckoCore/get-installed-path>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var endsWith = require('ends-with')
var getInstalledPath = require('./index')

test('get-installed-path:', function () {
  test('should throw TypeError if not a string given', function (done) {
    function fixture () {
      getInstalledPath([1, 2, 3])
    }

    test.throws(fixture, /expect `name` be string/)
    test.throws(fixture, TypeError)
    done()
  })
  test('should return filepath of globally installed package', function (done) {
    var actual = getInstalledPath('npm')
    var expected = 'node_modules/npm'

    test.equal(endsWith(actual, expected), true)
    done()
  })
  test('should return empty string if package is not installed globally', function (done) {
    var actual = getInstalledPath('koa')
    var expected = ''

    test.equal(endsWith(actual, expected), true)
    done()
  })
  test('should return filepath of locally installed package', function (done) {
    var actual = getInstalledPath('detect-installed', true)
    var expected = 'node_modules/detect-installed'

    test.equal(endsWith(actual, expected), true)
    done()
  })
  test('should return empty string if package is not installed locally', function (done) {
    var actual = getInstalledPath('koa', true)
    var expected = ''

    test.equal(endsWith(actual, expected), true)
    done()
  })
})
