const express = require('express');
const http = require('http');
const router = express.Router();


router.get('/ON', (req, res, next) => {
res.json(JSON.stringify({}));
});

router.get('/OFF', (req, res, next) =>{
res.json(JSON.stringify({}));

});


module.exports = router;
