/**
 * Created by lxy on 16/8/11.
 */
const jwt = require('jwt-simple');
const crypto = require('crypto');
const secret = require('../config/setting.js').SECRET;
exports.jwt = arg => {
    let token = jwt.encode({
        id: arg.id,
        email: arg.email,
        password: arg.password,
        ip: arg.ip,
        agent: arg.agent,
        date: (new Date()).valueOf(),
        expire: arg.expire ? 60 * 60 * 24 * 7 * 1000 : 60 * 60 * 2 * 1000
    }, secret);
    return token;
}
exports.md5 = pw => {
    let password = crypto.createHash('md5').update(pw).digest('base64');
    return password;
};