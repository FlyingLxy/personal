/**
 * Created by lxy on 16/8/11.
 */
const jwt = require('jwt-simple');
const crypto = require('crypto');
const secret = require('../config/setting.js').SECRET;
const db = require('../models/db.js');
// 生成json web token
exports.jwt = arg => {
    let token = jwt.encode({
        id: arg.id,
        email: arg.email,
        password: arg.password,
        ip: arg.ip,
        agent: arg.agent,
        date: (new Date()).valueOf(),
        expire: arg.expire ? 60 * 60 * 24 * 7 * 1000 : 60 * 1000
        //expire: arg.expire ? 60 * 60 * 24 * 7 * 1000 : 60 * 60 * 2 * 1000
    }, secret);
    return token;
}
exports.dejwt = token => {
    let detoken = jwt.decode(token,secret);
    return detoken;
}
// md5 加密
const encipher = pw => {
    let password = crypto.createHash('md5').update(pw).digest('base64');
    return password;
};
// 生成加密密码
exports.md5 = pw => {
    return encipher(encipher(pw).slice(7) + encipher(pw))
}


// 认证
exports.verify = (req,res,next) => {
    let token = req.headers['authorization'];
    let userInfo =  token ? jwt.decode(token,secret) : null;
    if (!userInfo) {
        // 缺少token;
        res.json({msg: '0'});
        return;
    }
    let currentDate = (new Date()).valueOf();
    console.log(userInfo.expire + userInfo.date , currentDate);
    if (userInfo.expire + userInfo.date > currentDate) {
        db.find('user',{id:userInfo.id}).then(result => {
            if (result.docs[0].password === userInfo.password && result.docs[0].id === userInfo.id && result.docs[0].email === userInfo.email) {
                next();
            }else {
                //token 错误
                res.json({msg: '2'})
            }
        }).catch(err => {
            console.log(err);
        })
    }else {
        // 0 token 过期
        res.json({msg: '1'})
    }
}