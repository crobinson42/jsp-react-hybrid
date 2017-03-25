import path from 'path';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

export default {
	context: __dirname,
	entry: path.resolve(__dirname, './components/main.js'),
	module: {
		loaders: [
			{
				include: path.resolve(__dirname, './components'),
				loader: 'babel-loader',
				test: /\.js$/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					// resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './built-components'),
		libraryTarget: 'umd'
	},
	plugins: [
		new ExtractTextPlugin('style.css')
	],
};