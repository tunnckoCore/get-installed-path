# [get-installed-path][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Get locally or globally installation path of the given package. Support sync and callback api.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i get-installed-path --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var getInstalledPath = require('get-installed-path')

getInstalledPath('npm')
//=> '/home/charlike/path/to/global/modules/node_modules/npm'

getInstalledPath('detect-installed', true)
//=> '/home/path/to/cwd/node_modules/detect-installed'
```


## Related
- [detect-installed](https://github.com/tunnckocore/detect-installed): Checks that given package name is installed locally or globally. Support sync and async api.
- [global-paths](https://github.com/jonschlinkert/global-paths): Returns an array of unique "global" directories based on the user's platform and environment. The… [more](https://github.com/jonschlinkert/global-paths)
- [global-prefix](https://github.com/jonschlinkert/global-prefix): Get the npm global path prefix.
- [global-modules](https://github.com/jonschlinkert/global-modules): The directory used by npm for globally installed npm modules.
- [helper-related](https://github.com/helpers/helper-related): Template helper for generating a list of links to the homepages of related GitHub/npm projects.
- [is-installed](https://github.com/tunnckoCore/is-installed): Checks that given package is installed on the system - globally or locally.
- [is-missing](https://github.com/tunnckocore/is-missing): Check that given `name` or `user/repo` exists in npm registry or in github as user… [more](https://github.com/tunnckocore/is-missing)
- [is-typeof-error](https://github.com/tunnckocore/is-typeof-error): Check that given value is any type of error and instanceof Error
- [npm-related](https://github.com/tunnckoCore/npm-related): Thin wrapper on top of `helper-related` for generating a list of links to the homepages… [more](https://github.com/tunnckoCore/npm-related)
- [npm-pkgs](https://github.com/tunnckoCore/npm-pkgs): List user npm packages from the [npmjs.com](http://npm.im)!
- [npm-pkgs-filter](https://github.com/tunnckoCore/npm-pkgs-filter): Filter the list of user npm packages from the [npmjs.com](https://npmjs.com) using glob pattern, function, array… [more](https://github.com/tunnckoCore/npm-pkgs-filter)


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/get-installed-path/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/get-installed-path
[npmjs-img]: https://img.shields.io/npm/v/get-installed-path.svg?label=get-installed-path

[license-url]: https://github.com/tunnckoCore/get-installed-path/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/get-installed-path
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/get-installed-path.svg

[travis-url]: https://travis-ci.org/tunnckoCore/get-installed-path
[travis-img]: https://img.shields.io/travis/tunnckoCore/get-installed-path.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/get-installed-path
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/get-installed-path.svg

[david-url]: https://david-dm.org/tunnckoCore/get-installed-path
[david-img]: https://img.shields.io/david/tunnckoCore/get-installed-path.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
