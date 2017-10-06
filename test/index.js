/**
 * @author Charlike Mike Reagent <open.source.charlike@gmail.com>
 * @copyright 2017 @tunnckoCore/team and contributors
 * @license MIT
 */

/* eslint-disable max-len */

import fs from 'fs'
import path from 'path'
import test from 'mukla'
import mkdirp from 'mkdirp'
import getDir from 'pkg-dir'
import rimraf from 'rimraf'

import { getInstalledPath, getInstalledPathSync } from '../src/index.js'

test('async: return rejected promise if exists but not a directory', async () => {
  fs.writeFileSync('./node_modules/foo-j4hbar-quxieiisas', 'xxxyyzzz')

  try {
    await getInstalledPath('foo-j4hbar-quxieiisas', {
      local: true,
    })
  } catch (err) {
    test.strictEqual(/some error occured/.test(err.message), true)
    test.strictEqual(/Possibly "foo-j4hbar-quxieiisas"/.test(err.message), true)
    test.strictEqual(/is not a directory/.test(err.message), true)
    rimraf.sync('./node_modules/foo-j4hbar-quxieiisas')
  }
})

test('sync: should throw if exists but not a directory', (done) => {
  function fixture () {
    fs.writeFileSync('./node_modules/aaaaa-xxx-x-sasas', 'abc')
    getInstalledPathSync('aaaaa-xxx-x-sasas', { local: true })
  }

  test.throws(fixture, Error)
  test.throws(fixture, /Possibly "aaaaa-xxx-x-sasas" is not a directory/)
  test.throws(fixture, /some error occured/)
  rimraf.sync('./node_modules/aaaaa-xxx-x-sasas')
  done()
})

test('async: should get TypeError when invalid `name` is passed', async () => {
  try {
    await getInstalledPath(1234)
  } catch (err) {
    test.strictEqual(err.name, 'TypeError')
    test.strictEqual(/expect `name` to be string/.test(err.message), true)
  }
})

test('async: should return absolute path if exists globally', async () => {
  const fp = await getInstalledPath('npm')

  test.strictEqual(/node_modules/.test(fp), true)
  test.strictEqual(/npm/.test(fp), true)
})

test('async: should return Error if not exists glboally', async () => {
  try {
    await getInstalledPath('foo-bar-bqwewrwevdfg-sa')
  } catch (err) {
    test.strictEqual(/module not found/.test(err.message), true)
    test.strictEqual(
      /"foo-bar-bqwewrwevdfg-sa" in path/.test(err.message),
      true
    )
  }
})

test('async: should return absolute path if exists locally', async () => {
  const fp = await getInstalledPath('global-modules', {
    local: true,
  })

  test.strictEqual(/get-installed-path/.test(fp), true)
  test.strictEqual(/node_modules/.test(fp), true)
  test.strictEqual(/global-modules/.test(fp), true)
})

test('async: should return Error if not exists locally', async () => {
  try {
    await getInstalledPath('sdfjkhskh3-sf9sd78fsdf', {
      local: true,
    })
  } catch (err) {
    test.strictEqual(/module not found/.test(err.message), true)
    test.strictEqual(/"sdfjkhskh3-sf9sd78fsdf" in path/.test(err.message), true)
    test.strictEqual(/get-installed-path/.test(err.message), true)
    test.strictEqual(/node_modules/.test(err.message), true)
  }
})

/**
 * testing synchronous mode
 */

test('sync: throw TypeError when invalid `name` is passed', (done) => {
  function fixture () {
    getInstalledPathSync(1234)
  }

  test.throws(fixture, TypeError)
  test.throws(fixture, /expect `name` to be string/)
  done()
})

test('synchronous: should return absolute path if exists globally', (done) => {
  const fp = getInstalledPathSync('npm')

  test.strictEqual(/node_modules/.test(fp), true)
  test.strictEqual(/npm/.test(fp), true)
  done()
})

test('synchronous: should throw Error if not exists globally', (done) => {
  function fixture () {
    getInstalledPathSync('foo-bar-bqwewrwevdfg-sa')
  }

  test.throws(fixture, Error)
  test.throws(fixture, /module not found/)
  test.throws(fixture, /"foo-bar-bqwewrwevdfg-sa" in path/)
  test.throws(fixture, /node_modules/)
  done()
})

test('synchronous: should return absolute path if exists locally', (done) => {
  const filepath = getInstalledPathSync('global-modules', {
    local: true,
  })
  test.strictEqual(/get-installed-path/.test(filepath), true)
  test.strictEqual(/node_modules/.test(filepath), true)
  test.strictEqual(/global-modules/.test(filepath), true)
  done()
})

test('synchronous: should throw Error if not exists locally', (done) => {
  function fixture () {
    getInstalledPathSync('sdfjkhskh3-sf9sd78fsdf', {
      local: true,
    })
  }

  test.throws(fixture, Error)
  test.throws(fixture, /module not found "sdfjkhskh3-sf9sd78fsdf"/)
  test.throws(fixture, /in path.*node_modules/)
  done()
})

test('sync: should work for subdirs (issue #5), exists locally', (done) => {
  const dirname = __dirname
  mkdirp.sync('barrr')
  process.chdir('barrr')

  const filepath = getInstalledPathSync('global-modules', {
    cwd: getDir.sync(),
    local: true,
  })

  test.strictEqual(/node_modules/.test(filepath), true)
  test.strictEqual(/global-modules/.test(filepath), true)

  process.chdir(dirname)
  rimraf.sync('barrr')
  done()
})

test('async: should work for #5, not exists locally', async () => {
  const dirname = __dirname
  mkdirp.sync('subdir')
  process.chdir('subdir')

  try {
    await getInstalledPath('npm', {
      cwd: getDir.sync(),
      local: true,
    })
  } catch (err) {
    test.strictEqual(/module not found "npm" in path/.test(err.message), true)

    process.chdir(dirname)
    rimraf.sync('subdir')
  }
})

test('async: should support recursing directories (#11)', async () => {
  const targetModuleDir = path.resolve(
    __dirname,
    './node_modules/target-module'
  )
  const testModuleDir = path.resolve(__dirname, './node_modules/test-module')

  mkdirp.sync(targetModuleDir)
  mkdirp.sync(path.resolve(testModuleDir, './node_modules'))

  fs.writeFileSync(
    path.resolve(targetModuleDir, './package.json'),
    JSON.stringify({ name: 'target-module' })
  )

  const fp = await getInstalledPath('target-module', {
    paths: [
      path.resolve(testModuleDir, './node_modules'),
      path.resolve(__dirname, './node_modules'),
    ],
  })

  test.strictEqual(/\/node_modules\/target-module/.test(fp), true)
})

test('synchronous: should support recursing directories (#11)', () => {
  const targetModuleDir = path.resolve(
    __dirname,
    './node_modules/target-module'
  )
  const testModuleDir = path.resolve(__dirname, './node_modules/test-module')

  mkdirp.sync(targetModuleDir)
  mkdirp.sync(path.resolve(testModuleDir, './node_modules'))

  fs.writeFileSync(
    path.resolve(targetModuleDir, './package.json'),
    JSON.stringify({ name: 'target-module' })
  )

  const filepath = getInstalledPathSync('target-module', {
    paths: [
      path.resolve(testModuleDir, './node_modules'),
      path.resolve(__dirname, './node_modules'),
    ],
  })

  test.strictEqual(/\/node_modules\/target-module/.test(filepath), true)
})
