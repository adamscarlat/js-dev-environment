import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true, //enables debugging information
  devtool: 'source-map',
  noInfo: false,
  entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')  //application entry point
	},
	target: 'web',   //can also be configured to NodeJS, electron etc... defines the way bundling works

	//with dev configuration the bundle.js won't get created but will only be in-memory and served to the browser
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
	plugins: [
		//Generate an external css file with a hash in the filename
		new ExtractTextPlugin('[name].[contenthash].css'),

		// Hash the files using MD5 so that their names change when the content changes - cache busting
		new WebpackMd5Hash(),

		//create seperate bundles for the vendor libraries
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),

		//create html file that includes reference to the bundled JS files
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true,
			minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
		}),

		//remove duplicate imports
		new webpack.optimize.DedupePlugin(),

		//minification
		new webpack.optimize.UglifyJsPlugin()
	], //hot-reloading, linting, etc...
	//file types we want webpack to handle.
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')},
      {test: /\.html$/, loader: "html-loader"}
    ]
  }
}
