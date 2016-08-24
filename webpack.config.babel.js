/**
 * Created by lxy on 16/8/10.
 */
import './server/config/local.env.js';
import webpack from 'webpack';
import path from 'path';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';
import qs from 'querystring';
import autoprefixer from 'autoprefixer';
import Webpack_isomorphic_tools_plugin from 'webpack-isomorphic-tools/plugin';
import webpack_isomorphic_tools_configuration from './webpack-isomorphic-tools-configuration.js';
const webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(webpack_isomorphic_tools_configuration)
      .development(process.env.NODE_ENV === 'development');

const env = process.env.NODE_ENV;
const cssLoaderQueries = qs.stringify({
    modules: true,
    importLoaders: 2,
    localIdentName: '[path]_[local]_[hash:base64:4]'
});

const config = {
    context: __dirname,
    entry: {
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux','react-router-redux', 'redux-thunk', 'isomorphic-fetch', 'webpack-hot-middleware/client?reload=true'],
        index: [path.resolve(__dirname, 'client/index.js'), 'webpack-hot-middleware/client?reload=true']
    },
    output: {
        path: `${__dirname}/public/assets/`,
        filename: '[name].js',
        publicPath: '/assets/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },
    devtool: env === 'development' ? 'source-map' : false,
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader','babel-loader'],
                exclude: /node_modules/
            },
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('style_modules'),
                loader: ExtractTextWebpackPlugin.extract('style-loader', `css-loader?${cssLoaderQueries}!postcss`),
                exclude: /node_modules/
            },
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('font'),
                loader: 'url-loader?limit=10&name=iconfont/[name].[ext]',
                exclude: /node_modules/
            },
            {
                test: webpack_isomorphic_tools_plugin.regular_expression('images'),
                loader: 'url-loader?limit=1024&name=img/[name].[ext]',
                exclude: /node_modules/
            }
        ]
    },
    postcss() {
        return [autoprefixer];
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
        }),
        new ExtractTextWebpackPlugin('[name].css', {allChunk: true}),
        new webpack.NoErrorsPlugin(),
        webpack_isomorphic_tools_plugin
    ]
}
if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,  // remove all comments
        },
        compress: {
            warnings: false
        }
    }));
}
export default config;
//module.exports = config;