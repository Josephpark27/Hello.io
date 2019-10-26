var User = require('../models/User');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find({}).then(succ => {
        res.send(succ);
    }).catch(err => {
        res.send(err);
    })
});

/* Login users listing. */
router.post('/login', function(req, res, next) {
    User.findOne({ username: req.query.username }).then(succ => {
        res.send(succ);
    }).catch(err => {
        console.log(err);
        res.send('Error user: ' + req.query.username + ' could not be found.');
    });

});

/* POST to create a new user */
router.post('/signup', function(req, res, next) {
    newUser = new User();
    if (req.query.username && req.query.lat && req.query.lng) {
        location = {
            type: 'Point',
            coordinates: [req.query.lat, req.query.lng]
        }
        newUser.username = req.query.username;
        newUser.location = location;
        newUser.save().then(succ => {
            res.sendStatus(200);

        }).catch(err => {
            res.send(err);
        });
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;