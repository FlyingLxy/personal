/**
 * Created by lxy on 16/8/15.
 */
const express = require('express');
const controller = require('./personal.controller');

const router = express.Router();

router.get('/info',controller.info);


module.exports = router;