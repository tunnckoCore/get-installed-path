/*!
 * get-installed-path <https://github.com/tunnckoCore/get-installed-path>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var once = require('once')
var dezalgo = require('dezalgo')
var modules = require('global-modules')
var detectInstalled = require('detect-installed')

module.exports = function getInstalledPath (name, local, callback) {
  if (!isValid(name)) {
    return null
  }
  var fp = path.join(modules, name)
  var nm = path.join(process.cwd(), 'node_modules', name)

  callback = typeof local === 'function' ? local : callback
  callback = typeof callback === 'function' ? once(dezalgo(callback)) : null
  local = typeof local === 'boolean' ? local : null
  fp = local ? nm : fp

  if (callback) {
    return detectInstalled(name, local, function (err, installed) {
      callback(err, installed ? fp : '')
    })
  }
  return detectInstalled(name, local) ? fp : ''
}

function isValid (val) {
  return typeof val === 'string' ? val.length > 0 : false
}
