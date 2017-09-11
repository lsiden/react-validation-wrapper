const path = require('path')

module.exports = {
	entry: {
		app: ['./demo/index.jsx']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'demo'),
		inline: true,
	},
	devtool: "eval-source-map",
	target: 'web',
	resolve: {
		extensions: ['.js', '.jsx', 'json']
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
};
