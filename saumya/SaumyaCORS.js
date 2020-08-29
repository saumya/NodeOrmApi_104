// CORS Enabler
// SaumyaCORS.js
// version: 1.0.0

// My Middleware for enabling multiple domains for CORS
// TODO: 
// Make a module and export it to be used as 
// app.use(MyCors)

// ref: https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
const myCORS = function (req, res, next) {
	console.log('======= :Saumya:CORS: =========================');
  var origin = req.headers.origin;
  var allowedDomains = ['http://localhost:3001','http://localhost:8080' ];

  console.log('--- domain -----------');
  console.log(origin);
  if(allowedDomains.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  console.log('--- domain / -----------');
  
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // VueJS App
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // ReactJS App
  
  //res.setHeader('Access-Control-Allow-Origin', 'https://doctor.findhealth.today');
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log('======= :Saumya:CORS: / =========================');
  // Pass to next layer of middleware
  next();
}
//app.use(myCORS);

module.exports = myCORS;




