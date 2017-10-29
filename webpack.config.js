const prod = process.argv.indexOf('-p') !== -1;
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: prod ? false : true
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const because = require('./because');
because();

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: prod ? "" : "source-map",
  devServer: {
    open: true,
    contentBase: './dist'
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: ['transform-runtime']
            }
          }
        },
        {
          test: /\.sass$/,
          use: extractSass.extract({
              use: [{
                  loader: "css-loader",
                  options: {
                    sourceMap: prod ? false : true
                  }
              }, {
                  loader: "sass-loader",
                  options: {
                    sourceMap: prod ? false : true
                  }
              }],
              fallback: "style-loader"
          })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
      extractSass,
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        title: 'shades',
        favicon: './src/favicon.ico',
        filename: './index.html',
        template: './src/index.html'
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.ProvidePlugin({
      THREE: "three"
    })
  ]
};
