import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default (fixture, options = {}) => {
	const compiler = webpack({
		context: __dirname,
		entry: `./${fixture}`,
		output: {
			path: path.resolve(__dirname),
			filename: 'home.js'
		},
		module: {
			rules: [
				{
					test: /\.txt$/,
					use: {
						loader: path.resolve(__dirname, '../loaders/replace.js'),
						options: {
							name: 'Nik'
						}
					}
				}
			]
		}
	});

	compiler.outputFileSystem = new memoryfs();

	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			if (err || stats.hasErrors()) reject(err);

			resolve(stats);
		});
	});
};