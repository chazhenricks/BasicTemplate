import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
      //Generate external css file
      new ExtractTextPlugin('[name].css'),
      //Use CommonsChunkPlugin to create seperatebundle of vendor libraries so that theyre cached seperately
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),
      //Create HTML file that includes references to bundled JS
      new HtmlWebpackPlugin({
          template: 'src/index.html',
          minify: {
              removeComments: true,
              collapseInlineTagWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
          },
          inject: true,

      }),
      //Eliminate duplicate packages when generating bundle
      new webpack.optimize.DedupePlugin(),
      //Minify Javascript
      new webpack.optimize.UglifyJsPlugin(),
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}