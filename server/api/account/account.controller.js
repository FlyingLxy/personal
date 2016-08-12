/**
 * Created by lxy on 16/8/11.
 */
const ccap = require('ccap');
const db = require('../../models/db.js');
const auth = require('../../middleware/auth.js');

module.exports = {
    // 生成验证码
    captcha: (req, res) => {
        let captch = ccap({
            width: 120,
            height: 40,
            offset: 24,
            fontSize: 14,
            quality: 50
        });
        let arr = captch.get();
        res.json({msg: 'ok', captchaText: arr[0], captchaImg: `data:image/bmp;base64,${arr[1].toString('base64')}`});
    },
    // 添加新用户
    signup: (req, res) => {
        let email = req.body.email;
        let password = auth.md5(auth.md5(req.body.password).slice(7) + auth.md5(req.body.password))
        let ip = req.ip.slice(req.ip.search(/[0-9]/ig)) || '';
        let agent = req.headers['user-agent'];
        console.log(req.body);
        // 查询用户是否存在
        db.find('user', {email: email}).then(result => {
            if (result.docs.length === 0) {
                // 获取自增id
                db.getId('ids').then((result) => {
                    // 插入新用户
                    let id = result.value.id;
                    db.insert('user', [
                        {
                            id: id,
                            email: email,
                            password: password
                        }
                    ]).then(result => {
                        // 获取token 并返回
                        let token = auth.jwt({
                            id: id,
                            email: email,
                            password: password,
                            ip: ip,
                            agent: agent,
                            expire: false
                        });
                        res.json({msg: 'ok', result:{id: id, email: email, token: token}});
                    }).catch(err => {
                        res.status(501).json({msg: err});
                        console.log(err);
                    })
                }).catch((err) => {
                    res.status(501).json({msg: err});
                    console.log(err);
                });
            } else {
                res.json({msg: '该用户已经存在'});
            }
        }).catch(err => {
            res.status(501).json({msg: err});
            console.log(err);
        })

    },
    //邮箱验证
    email: (req, res) => {
        let email = req.query.email;
        db.find('user', {email: email}).then((result) => {
            if (result.docs.length > 0) {
                res.json({msg: '该邮箱已注册'});
            }
            res.json({msg: 'ok'});
        }).catch((err)=> {
            res.status(501).json({msg: err});
            console.log(err);
        })
    }
}