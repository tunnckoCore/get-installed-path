/*!
 * get-installed-path <https://github.com/tunnckoCore/get-installed-path>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const modules = require('global-modules')

/**
 * > Get installed path of globally or locally `name` package.
 * By default it checks if `name` exists as directory in [global-modules][]
 * directory of the system. Pass `opts.local` to get path of `name`
 * package from local directory or from `opts.cwd`. Returns rejected
 * promise if module not found in global/local `node_modules` folder or
 * if it exist but is not a directory.
 *
 * **Example**
 *
 * ```js
 * const getInstalledPath = require('get-installed-path')
 *
 * getInstalledPath('npm').then((path) => {
 *   console.log(path)
 *   // => '/home/charlike/.nvm/path/to/lib/node_modules/npm'
 * })
 *
 * getInstalledPath('foo-bar-barwerwlekrjw').catch((err) => {
 *   console.log(err.message)
 *   // => 'module not found "foo-bar-barwerwlekrjw" in path ...'
 * })
 *
 * getInstalledPath('npm', {
 *   local: true
 * }).catch((err) => {
 *   console.log(err.message)
 *   // => 'module not found "foo-bar-barwerwlekrjw" in path ...'
 * })
 *
 * getInstalledPath('global-modules', {
 *   local: true
 * }).then((path) => {
 *   console.log(path)
 *   // => '~/code/get-installed-path/node_modules/global-modules'
 * })
 *
 * // If you are using it for some sub-directory
 * // pass `opts.cwd` to be where the `node_modules`
 * // folder is.
 * process.chidr('foo-bar-baz')
 * getInstalledPath('global-modules', {
 *   local: true,
 *   cwd: '../'
 * }).then((path) => {
 *   console.log(path)
 *   // => '~/code/get-installed-path/node_modules/global-modules'
 * })
 * ```
 *
 * @param  {String} `name` package name
 * @param  {Object} `opts` pass `opts.local` to check locally
 * @return {Promise} rejected promise if `name` not a string or is empty string
 * @api public
 */

module.exports = function getInstalledPath (name, opts) {
  return new Promise((resolve, reject) => {
    if (!isValidString(name)) {
      const message = 'get-installed-path: expect `name` to be string'
      return reject(new TypeError(message))
    }

    const filepath = defaults(name, opts)
    fs.stat(filepath, (err, stats) => {
      if (err) {
        const label = 'get-installed-path:'
        const msg = `${label} module not found "${name}" in path ${filepath}`
        return reject(new Error(msg))
      }
      resolve(filepath)
    })
  })
}

/**
 * > Get installed path of a `name` package synchronous.
 *
 * **Example**
 *
 * ```js
 * const getInstalledPath = require('get-installed-path')
 *
 * const npmPath = getInstalledPath.sync('npm')
 * console.log(npmPath)
 * // => '/home/charlike/.nvm/path/to/lib/node_modules/npm'
 *
 * const gmPath = getInstalledPath.sync('global-modules', { local: true })
 * console.log(gmPath)
 * // => '~/code/get-installed-path/node_modules/global-modules'
 * ```
 *
 * @name   .sync
 * @param  {String} `name` package name
 * @param  {Object} `opts` pass `opts.local` to check locally
 * @return {Boolean} or throw `TypeError` if `name` not a string or is empty string
 * @api public
 */

module.exports.sync = function getInstalledPathSync (name, opts) {
  if (!isValidString(name)) {
    throw new TypeError('get-installed-path: expect `name` to be string')
  }

  const filepath = defaults(name, opts)
  let stat = null

  try {
    stat = fs.statSync(filepath)
  } catch (e) {
    const label = 'get-installed-path:'
    const msg = `${label} module not found "${name}" in path ${filepath}`
    throw new Error(msg)
  }

  if (stat.isDirectory()) {
    return filepath
  }

  const msg = `Possibly "${name}" is not a directory: ${filepath}`
  throw new Error('get-installed-path: some error occured! ' + msg)
}

const isValidString = (val) => {
  return typeof val === 'string' ? val.length > 0 : false
}

const defaults = (name, opts) => {
  opts = opts && typeof opts === 'object' ? opts : {}
  opts.cwd = typeof opts.cwd === 'string' ? opts.cwd : process.cwd()

  return opts.local
    ? path.join(opts.cwd, 'node_modules', name)
    : path.join(modules, name)
}
