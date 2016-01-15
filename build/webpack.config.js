var vue = require('vue-loader');
var webpack = require('webpack');
var path = require('path')

module.exports = {
  entry: {
    main : ['./example/main.js']  // 用 [] 是为了在这里加入 webpack socket，实现自动刷新
  },
  output: {
    path: __dirname + '/static',
    publicPath: '/static/',
    filename: '[name].js'
  },
   resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api/,
        loader: 'babel'
      },
      { test: /\.css$/, 
        loader: "style-loader!css-loader" 
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [],
  debug: true,
  displayErrorDetails: true,
  outputPathinfo: true,
  recordsPath: '/Users/lzw/code-review/code-review-web/webpack.json'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}
