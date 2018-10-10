var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.join(__dirname, "dist/"),
    publicPath: "/",
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  resolve: {
    alias: {
      "assets": path.join(__dirname, "assets/"),
      "style": path.join(__dirname, "src/style"),
    }
  },
  devtool: "inline-source-map",
  performance: {
    hints: "warning"
  },
  stats: {
    colors: true,
    warnings: true,
    errors: true,
    chunks: false,
    cached: true,
    assets: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "index.html")
    })
    //new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
          {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        options: {
          presets: [ "@babel/preset-env" ],
          plugins: [
            "@babel/plugin-transform-spread",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import"
          ],
          babelrc: false,
          sourceMaps: true
        }
      },
      {
       test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  stage: 0,
                  browsers: 'last 2 versions'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(ico|ttf|woff2|png|jpg|svgjson|gif)$/,
        loader: "file-loader?name=[path][name].[ext]"
      },
    ]
  }
}