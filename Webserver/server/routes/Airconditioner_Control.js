const express = require('express');
const http = require('http');
const router = express.Router();

const airconditioner_Url = require('../url_Model/airconditioner_Url');
const airconditioner = require('../model/airconditioner');

router.get('/power', (req, res, next) => {
    airconditioner.power=1-airconditioner.power;
    console.log('Airconditioner Power');
    airconditioner_Url.path += airconditioner.control.power;
    console.log(airconditioner.control.power);
    http.request(airconditioner_Url).end();
    airconditioner_Url.path = '?';
    res.json(JSON.stringify({}));
});

module.exports = router;
