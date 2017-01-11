import path from 'path'
import webpack from 'webpack'

export default {
	devtool: 'eval-source-map',
	entry: [
    	'webpack-hot-middleware/client',
    	path.join(__dirname, '/client/index.js')
  	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [path.join(__dirname, 'client') , path.join(__dirname, 'lib/validations')],
				loaders: ['react-hot','babel','babel-loader']
			}
		]
	},
	resolve: {
		extentions: ['' , '.js']
	}
}