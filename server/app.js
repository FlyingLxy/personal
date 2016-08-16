/**
 * Created by lxy on 16/8/10.
 */
require('./config/local.env.js');

const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const routes = require('./routes.js');
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevConfig = require('../webpack.dev.config.js');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const compiler = webpack(webpackDevConfig);
    app.use(WebpackDevMiddleware(compiler,{
        publicPath: webpackDevConfig.output.publicPath,
        hot: true,
    }));
    app.use(WebpackHotMiddleware(compiler,{
        log: console.log
    }));
    app.get('/',(req,res) => {
        res.redirect('/flyingfox')
    })
    app.get('/flyingfox/*',(req,res) => {
        res.redirect('/flyingfox');
    })
}else {
    app.use('/public',express.static(path.resolve(__dirname,'../dist/public')));
    app.get('/',(req,res) => res.redirect('/flyingfox'));
    app.get(['/flyingfox','/flyingfox/*'],routes.showIndex);
}
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(cookieParser());
require('./api.js')(app);

app.listen(process.env.PORT);