### Different Styles

### SCSS (Sassy CSS):
* We are gonna use SCSS for a few reasons:
	* readibility: the syntax is very similar to CSS
	* learning curve: it only adds a few additional features on top of CSS
	* compatibility; a CSS file is a valid SCSS file
	* resources: lots of online articles to read and open source libraries to use
	* expandibility: it’s easy to go from SCSS to Sass

### SASS (Syntactically Awesome StyleSheets)
* Sass is the name of the preprocessor
* Everything in SCSS is available in Sass
* What Sass provides is:
	* variables: instead of repeating #fce473 throughout your CSS file, just set $yellow: #fce473 once
	* nesting: CSS rules can be nested within each other
	* mixins: custom functions that can accept parameters and will prevent useless repetitions
	* extensions: an easy way to inherit the same properties of another selector
	* operators: adding/substracting/multiplying/dividing values, like 960px / 4 or $space * 2

### LESS (Leaner Style Sheets)
* Is a backwards-compatible language extension for CSS. This is the official documentation for Less, the language and Less.js, the  
  JavaScript tool that converts your Less styles to CSS styles.	https://lesscss.org/#overview

### Loader vs Plugins
                    
Loader  | Plugins
------------- | -------------
Loaders work at the individual file level during or before the bundle is generated.  | Plugins work at bundle or chunk level and usually work at the end of the bundle generation process. 
They define how your code will look like. With loaders, you can modify any part of your code  | Webpack is a plugin with behavior by default, bundle assets. Adding a plugin in your configuration will add, sequentially, one more step to the queue of tasks that webpack needs to do before giving away your files.
Loaders work at a file level. They can write template, process some code to transpile it depending on your convenience | Plugins work at a system level. They can work on pattern, file system handling (name, path), etc.

* Plugins (https://webpack.js.org/concepts/plugins)

	* Plugins are the backbone of webpack. webpack itself is built on the same plugin system that you use in your webpack configuration!
	* They also serve the purpose of doing anything else that a loader cannot do.
	* A webpack plugin is a JavaScript object that has an apply method. This apply method is called by the webpack compiler,
	  giving access to the entire compilation lifecycle.

* Loaders (https://webpack.js.org/concepts/loaders/)

	* Loaders are transformations that are applied on the source code of a module. 
	* They allow you to pre-process files as you import or “load” them. 
	* Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. 
	* Loaders can transform files from a different language (like TypeScript) to JavaScript or inline images as data URLs. 
	* Loaders even allow you to do things like import CSS files directly from your JavaScript modules



### Need of Bundling  

* Combining Two files (Reduce code Size)
* Minification (Remove white spaces)
* File order dependency (Use modular structure)
* Transpilations (New feature of language can be transpiled for older version, E.g. Typescript compiled to javascript to support ECMA
  standards)
* Linting (Check missing colons, unused variables and formatting)


### Why Webpack

* Loaders (send one or more file to loader and one or more will come out, same as Task runners)
* We can do Transpilation, concatenation, Minification and combine css to js
* Uses NPM  & Module Systems


### Basic Build with Webpack

* `Installation`

* `mkdir webpack-demo && cd webpack-demo`

* `npm init -y`

* `npm install webpack webpack-cli --save-dev`

* `npx webpack`

### Configuration

* Create `webpack.config.js`

```javascript
const path = require('path');
module.exports = {
 entry: './src/index.js',
 output: {
   filename: 'main.js',
   path: path.resolve(__dirname, 'dist')
 }
};
```

* Now, lets run the build again but instead using our new configuration file:

 `npx webpack --config webpack.config.js`

* Let's adjust our package.json by adding an npm script:
```javascript
{
	"name": "webpack-demo",
	"version": "1.0.0",
	"description": "",
	"private": true,
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"webpack": "^4.29.3",
		"webpack-cli": "^3.2.3"
	},
	"dependencies": {
	}
}
```
* Now run `npm run build`


* Dev Server
	* `npm install webpack-dev-server -g` (Dev server)
	
	* `webpack-dev-server`
	
	* `localhost:8080/webpack-dev-server` (with status bar)

* Building Multiple files
	* Typical way: Add `require('./login')` in `app.js`
	* Config way:
```javascript
	const path = require('path');
	module.exports = {
		entry: './src/index.js',
		output: {
				filename: 'main.js',
				path: path.resolve(__dirname, 'dist')
		},
		watch: true
};
```

### Loaders

* Babel supports  transpiling JavaScript files and jshint supports LINTING

	* `npm install babel-core babel-loader --save-dev`

	* `npm install eslint eslint-loader eslint-plugin-react babel-eslint eslint-config-defaults --save-dev`

* Add Loader in config file
	* Rename `login.js` to `login.es6`
	* Add below setting in config file

```javascript
module: {
rules:[
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /(node_modules/,
			loader: 'jshint-loader',
		},
		{
			test: /\.m?js$/,
			exclude: /(node_modules/,
			loader: 'babel-loader'
		}
	],
},
resolve: {
	extensions: ['', '.js', '.es6']
}
```

* This will load es6 file through loader


### Build Configurations

* In `webpack.js`, we now have set-up our entry and output configuration and we've included any plugins that are required for both environments

* In `webpack.dev.js`, we've set mode to `development` and in `webpack.prod.js`, we have set mode to `production`.  In webpack script, that in `package.json` we will add

```javascript
"scripts": {
   "serve": "webpack-dev-server --open --config webpack.dev.config.js",
   "build": "webpack --config webpack.prod.config.js"
 } 
```
* You can also configure webpack dev server in `webpack.dev.js` as

```javascript
devServer: {
	compress: false,
	port: 9000
}
```

### Organizing files & folders

* Declare virtual folder to access bundle.js , create new folder "Build" and move all html files to folder "public"
```javascript			
output: {
	filename: 'bundle.js',
	path: path.resolve(__dirname, 'build/js'),
	publicPath: '/public/assets/js'
}
```

##### More Info (<https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9>)
