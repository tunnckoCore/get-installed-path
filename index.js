/**
 * get-installed-path <https://github.com/tunnckoCore/get-installed-path>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var path = require('path')
var modules = require('global-modules')
var detectInstalled = require('detect-installed')

module.exports = function getInstalledPath (name, local) {
  if (detectInstalled(name)) {
    return path.join(modules, name)
  }
  if (detectInstalled(name, local)) {
    var cwd = process.cwd()
    return path.join(cwd, 'node_modules', name)
  }
  return ''
}
