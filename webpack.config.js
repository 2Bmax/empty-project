const path = require('path');
const webpack = require('webpack');

console.log('============================= '+process.env.NODE_ENV+' BUILD =============================');

module.exports = function(){
	return{
		entry:{
			index:'./src/index.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js'
		},
	 	context: __dirname,
		module:{
			rules:[
				{
					test:/\.js$/,
					include: [
						path.resolve(__dirname, 'src')
			        ],
					exclude: [
	 					path.resolve(__dirname, 'node_modules'),
						path.resolve(__dirname, 'dist')
			 		],
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015','react']
						}
					}
				}
			]
		}
	}
};
