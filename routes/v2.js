//
// API : Version : 2.0.0
//

var express = require('express');
var router = express.Router();

var modelFactory = require('../model/model.factory');

router.get('/', function(req, res, next) {
  res.render('v1home', { title: 'API | Version 2.0.0' });
  // TODO: render with a v2 Template view
  //res.render('v2home', { title: 'API | Version 2.0.0' });
});


//finally

module.exports = router;