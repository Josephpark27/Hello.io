var express = require('express');
var router = express.Router();

/* GET all bosses. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.ws('/socket', function(msg) {
    console.log(msg)
});

/* GET a specific boss. */
router.get('/boss/:bossID', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;