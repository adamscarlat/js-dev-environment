import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  debug: true, //enables debugging information
  devtool: 'inline-source-map', //source-maps that are desinged for speed
  noInfo: false,
  entry: [
    path.resolve(__dirname, 'src/index')  //application entry point
  ],
	target: 'web',   //can also be configured to NodeJS, electron etc... defines the way bundling works

	//with dev configuration the bundle.js won't get created but will only be in-memory and served to the browser
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: true
		})
	], //hot-reloading, linting, etc...

	//file types we want webpack to handle.
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']},
      {test: /\.html$/, loader: "html-loader"}
    ]
  }
}
