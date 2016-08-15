/**
 * Created by lxy on 16/8/10.
 */
var path = require('path');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk','fetch-ie8'],
        index: [path.resolve(__dirname, 'client/main/index.js')]
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'public/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['','.js','.jsx','.scss'],
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },
    devtool: false,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader','css-loader!sass-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextWebpackPlugin.extract('style-loader','css-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=font/[name].[ext]',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png)\??.*$/,
                loader: 'url-loader?limit=50000&name=img/[name].[ext]',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new ExtractTextWebpackPlugin('public/css/[name].css', {allChunk: true}),
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'client/main/index.html'),
            filename: path.resolve(__dirname,'dist/public/index.html'),
            hash: false,
            inject: true,
            cache: false,
            chunks: ['vendor', 'index'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
}