const express = require('express');
const router = express.Router();
// const Boss = require('../models/Boss');
const gameSessions = require('../controllers/gameSessions');

router.get('/', async function(req, res, next) {
    let output = (await gameSessions).oldBosses();
    res.json(output);
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