const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const configFetch = function (mode) {
	if (mode === "development")
		return require('./webpack.dev.config.js');
	else if (mode === "production")
		return require('./webpack.prod.config.js');
	else
		return require('./webpack.config.js');;
};

const app = express(),
	config = configFetch(process.env.NODE_ENV),
	compiler = webpack(config),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, 'index.html');

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.get('*', function response(req, res) {
	res.sendFile(HTML_FILE);
});

//Serve the files on port 3000
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
	console.log(`App listening to ${PORT}....`);
});