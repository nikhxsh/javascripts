const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		compress: false,
		port: 3000
	},
	watch: true
});