//https://webpack.js.org/api/compiler-hooks/

class FileListPlugin {

	constructor(options) {
		this.options = options;
	}

	apply(compiler) {

		const { name } = this.options;

		compiler.hooks.emit.tapAsync('FileList', (compilation, callback) => {
			var filelist = 'In the build:\n\n';

			//loop through all complation assets
			for (var file in compilation.assets) {
				filelist += '- ' + file + '\n';
			}

			//Insert this list into the webpack build as a new file assets
			compilation.assets[name] = {
				source: function () {
					return filelist;
				},
				size: function () {
					return filelist.length;
				}
			};

			callback();
		});
	}
}

module.exports = FileListPlugin;