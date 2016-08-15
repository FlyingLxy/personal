/**
 * Created by lxy on 16/8/11.
 */

module.exports = app => {
    app.use('/api/account',require('./api/account'));
    app.use('/api/personal',require('./api/personal'));
}
