const express = require('express');
const http = require('http');
const router = express.Router();


router.post('/ON', (req, res, next) => {
    console.log(JSON.stringify(req.body));
    res.json(JSON.stringify({}));
});

module.exports = router;
