const express = require('express');
const router = express.Router();

const User = require('../models/User');

var meterConversion = (function() {
    var mToKm = function(distance) {
        return parseFloat(distance / 1000);
    };
    var kmToM = function(distance) {
        return parseFloat(distance * 1000);
    };
    return {
        mToKm: mToKm,
        kmToM: kmToM
    };
})();

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
            coordinates: [req.query.lng, req.query.lat]
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

/* POST to create a new user */
router.get('/near', function(req, res, next) {
    if (req.query.lat && req.query.lng) {
        User.find({
                location: {
                    $geoWithin: {
                        $center: [
                            [req.query.lat, req.query.lng], req.query.distance
                        ]
                    }
                }
            }).then(succ => {
                res.send(succ);
            })
            .catch(err => {
                res.send(err);
            });
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;