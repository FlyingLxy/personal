/**
 * Created by lxy on 16/8/10.
 */

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from '../webpack.config.babel.js';
import React from 'react';
import path from 'path';
import webpack_isomorphic_tools_configuration from '../webpack-isomorphic-tools-configuration.js';
import Webpack_isomorphic_tools from 'webpack-isomorphic-tools';

const app = express();
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(cookieParser());


if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config);
    const { publicPath } = config.output;
    const hasColor = process.env.NODE_ENV === 'development';
    const options = {publicPath, stats: {color: hasColor}};
    app.use(require('webpack-dev-middleware')(compiler, options));
    app.use(require('webpack-hot-middleware')(compiler));
}else {
    app.use('/assets', express.static(path.resolve(__dirname, '../public/assets/')))
}
//global._server_ = true
//global._client_ = false
//global._disable_server_side_rendering_ = false
app.get('/', (req, res) => res.redirect('/flyingfox'));
global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(webpack_isomorphic_tools_configuration)
      .development(process.env.NODE_ENV === 'development')
      .server(config.context, function () {
          app.use('/flyingfox', require('./render'));
      });
require('./api.js')(app);

const server = app.listen(process.env.PORT || 6625, () => {
    const { port } = server.address();
    console.info(`环境 => ${process.env.NODE_ENV}`);
    console.info(`地址 => http://localhost:${port}`);
})