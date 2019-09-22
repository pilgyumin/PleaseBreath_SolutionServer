const express = require('express');
const http = require('http');
const router = express.Router();

router.get('/aircleaner', (req, res, next) => {


    res.json(JSON.stringify());

    console.log();
});

router.get('/humidifier', (req, res, next) => {


    res.json(JSON.stringify());

    console.log();
});

router.get('/airconditioner', (req, res, next) => {


    res.json(JSON.stringify());

    console.log();
});

module.exports = router;