/**
 * Created by lxy on 16/8/11.
 */

const express = require('express');
const controller = require('./account.controller');

var router = express.Router();

router.post('/signup',controller.signup);
router.get('/captcha',controller.captcha);
router.get('/email',controller.email);

module.exports = router;