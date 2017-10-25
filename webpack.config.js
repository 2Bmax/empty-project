const path = require('path');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV.trim();
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    source: path.join(__dirname, 'public_html/www/src'),
    build: path.join(__dirname, 'public_html/www/build')
};

console.log('============================= ' + ENV + ' BUILD =============================');

module.exports = {
    entry: {//scripts entry points (compile FROM)
        welcome: PATHS.source + '/pages/welcome/welcome.js'//TODO:РІС‹РЅРµСЃС‚Рё СЃРїРёСЃРѕРє СЃС‚СЂР°РЅРёС† РІ РѕС‚РґРµР»СЊРЅС‹Р№ С„Р°Р№Р»
    },
    output: {//scripts output folders (compile TO)
        path: PATHS.build + '/pages',
        filename: '[name]/[name].bundle.js'
    },
    context: __dirname,//The base directory, an absolute path, for resolving entry points and loaders from configuration.
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                    PATHS.build
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
            },{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use:['css-loader','less-loader']
                })
            },{
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath:'../images/',
                            publicPath:'../'
                        }
                    }
                ]
            },{
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'[name].[ext]',
                            outputPath:'../fonts/',
                            publicPath:'../'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '../common/common.bundle.js'
        }),
        new webpack.DefinePlugin({//environment in modules
            'process.env': {
                NODE_ENV: JSON.stringify(ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: (ENV === 'development'),
            mangle: (ENV === 'production')
        }),
        new ExtractTextPlugin({
            filename:'[name]/[name].css',
            allChunks :true
        })
    ]
};
