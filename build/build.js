/**
 * 
 * @authors yuqiu (yuqiu@luojilab.com)
 * @date    2015-12-24 19:44:04
 * @version $Id$
 */

var fs = require("fs")
var browserify = require('browserify')
var vueify = require('vueify')
var babelify =require('babelify');

browserify('src/main.js')
  .transform(vueify)
  .transform(babelify)
  .bundle()
  .pipe(fs.createWriteStream("bundle.js"))