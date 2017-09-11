const path = require('path')
let config = {
	target: 'web',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: 'dist'
	},
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
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
				],
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{ loader: 'url-loader' },
				]
			}
		],
	},
};

if (process.env.NODE_ENV.match(/^prod/i)) {
	const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
	Object.assign(config, {
		entry: {
			app: ['./index.jsx']
		},
		plugins: [
			new UglifyJSPlugin({
				test: /\.js[x]?$/,
				sourceMap: true,
			}),
		],
		devtool: "source-map",
	})
} else {
	Object.assign(config, {
		entry: {
			app: ['./index.jsx']
		},
		devServer: {
			contentBase: '.',
			inline: true,
		},
		devtool: "eval-source-map",
	})
}
module.exports = config