const Users = require('../models/Users');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find({}, (err, doc) => {
    if(err) return next(error);
    else if(doc) res.send(doc);
  });
});

/* Login users listing. */
router.post('/login', function(req, res, next) {
  Users.findOne({username:req.username}, (err, doc) => {
    if(err) return next(error);
    else if(doc) res.send('Hello: ', doc.username);
  });
  res.send('Error user: ', req.username, ' could not be found.');
});

/* POST to create a new user */
router.post('/signup', function(req, res, next) {
  let newUser = {};
  newUser.username = req.username;
  newUser.location = req.location;
  Users.create(newUser, (err, user) => {
    if(err) next(err);
    res.send(user);
  });
});

module.exports = router;
