var fs = require('fs')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var postcss = require('rollup-plugin-postcss')
var version = process.env.VERSION || require('../package.json').version
var banner =
  '/*!\n' +
  ' * vue-pagination v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + 'Leslie Yu qiu\n' +
  ' * Released under the MIT License.\n' +
  ' */'

rollup.rollup({
  entry: 'src/main.js',
  plugins: [
    postcss({
      include: '**/*.css',
      sourceMap: true,
      plugins: [
        require('postcss-nested')
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}).then(function (bundle) {
  bundle.write({
    format: 'cjs',
    dest: 'dist/vue-pagination.common.js'
  }).then(function () {
    console.log('built: dist/vue-pagination.common.js')
  })
  return bundle.write({
    format: 'umd',
    banner: banner,
    moduleName: 'VuePagination',
    sourceMap: true,
    dest: 'dist/vue-pagination.js'
  })
}).then(function () {
  console.log('built: ' + 'dist/vue-pagination.js')
  fs.writeFile(
    'dist/vue-pagination.min.js',
    banner + '\n' + uglify.minify('dist/vue-pagination.js').code,
    function (err) {
      if (err) throw err
      console.log('built: ' + 'dist/vue-pagination.min.js')
    }
  )
}).catch(function (e) {
  console.log(e)
})