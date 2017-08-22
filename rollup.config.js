const pkg = require('./package.json')

module.exports = {
  entry: 'src/index.js',
  interop: false,
  external: Object.keys(pkg.dependencies),
  targets: [
    { dest: 'dest/index.js', format: 'cjs' },
    { dest: 'dest/index.mjs', format: 'es' },
  ],
}
