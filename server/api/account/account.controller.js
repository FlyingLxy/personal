/**
 * Created by lxy on 16/8/11.
 */
const ccap = require('ccap');
const db = require('../../models/db.js');
const auth = require('../../middleware/auth.js');


const userInfo = (body, ip, headers) => {
    return {
        email: body.email,
        password: auth.md5(body.password),
        expire: body.session || false,
        ip: ip.slice(ip.search(/[0-9]/ig)) || '',
        agent: headers['user-agent']
    }
}
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
    signin: (req, res) => {
        let user = userInfo(req.body, req.ip, req.headers);
        // 查询用户是否存在
        db.find('user', {email: user.email})
              .then(result => {
                  // 判断是否有该用户
                  if (result.docs.length === 0) {
                      res.json({msg: '0', result: '该邮箱不存在'});
                  }else {
                      // 判断密码是否正确
                      if (user.password === result.docs[0].password) {
                          //生成token 返回
                          let token = auth.jwt({
                              id: result.docs[0].id,
                              email: user.email,
                              password: user.password,
                              ip: user.ip,
                              agent: user.agent,
                              expire: user.expire
                          });
                          res.json({msg: 'ok', result: {id: result.docs[0].id, email: user.email, token:token}});
                      }else {
                          res.json({msg: '1', result: '密码错误'})
                      }
                  }
              })
    },
    // 添加新用户
    signup: (req, res) => {
        let user = userInfo(req.body, req.ip, req.headers);
        console.log(req.body);
        // 查询用户是否存在
        db.find('user', {email: user.email}).then(result => {
            if (result.docs.length === 0) {
                // 获取自增id
                db.getId('ids').then((result) => {
                    // 插入新用户
                    let id = result.value.id;
                    db.insert('user', [
                        {
                            id: id,
                            email: user.email,
                            password: user.password
                        }
                    ]).then(result => {
                        // 获取token 并返回
                        let token = auth.jwt({
                            id: id,
                            email: user.email,
                            password: user.password,
                            ip: user.ip,
                            agent: user.agent,
                            expire: user.expire
                        });
                        res.json({msg: 'ok', result: {id: id, email: user.email, token: token}});
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