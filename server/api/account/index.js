/**
 * Created by lxy on 16/8/11.
 */
const express = require('express');
const controller = require('./account.controller');
const auth = require('../../middleware/auth');
var router = express.Router();

router.post('/signup',controller.signup);
router.post('/signin',controller.signin);
router.get('/captcha',controller.captcha);
router.get('/email',controller.email);
router.get('/download',controller.download);
router.post('/authorization',auth.verify,controller.authorization)
module.exports = router;