var path = require('path');

module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js'
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				include: [
					path.resolve(__dirname, 'src')
		        ],
				exclude: [
 					path.resolve(__dirname, 'node_modules')
		 		]
			}
		]
	}
};
