//
//
var express = require('express');
var router = express.Router();

//------------------------------------- Model Factory ------------------------
const modelFactory = require('../model/model.factory');
modelFactory.initModelFactory(onModelFactoryInitDone,onModelFactoryInitFail);
function onModelFactoryInitDone(sequelize){
    console.log('app.js: onModelFactoryInitDone');
    console.log('+-----------------------------------------');
    console.log('| Application: Init : Done ');
    console.log('+-----------------------------------------');
    //console.log('sequelize',sequelize);
    
    //sequelize = modelFactory.getORMRef();
    //console.log(sequelize);
    
    //modelFactory.initTheModels();
}
function onModelFactoryInitFail(error){
    console.log('app.js: onModelFactoryInitFail');
    console.log('error',error);
}

//------------------------------------- API -----------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express | Sequelize | API' });
});




router.get('/ormCheck',function(request,response,next){
	//const result = connCheck();
	response.send( JSON.stringify({'Checked':true}) );
});

module.exports = router;
