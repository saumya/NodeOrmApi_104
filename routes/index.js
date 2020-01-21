var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express | Sequelize | API' });
});

router.get('/ormCheck',function(request,response,next){
	//const result = connCheck();
	response.send( JSON.stringify({'Checked':true}) );
});

module.exports = router;
