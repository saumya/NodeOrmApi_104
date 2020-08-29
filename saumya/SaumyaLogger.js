// MyLogger
// SaumyaLogger.js
// version: 1.0.0

// My Middleware for Logging in console
// This is called everytime any call comes to the server

const myLogger = function (req, res, next) {
  console.log('=======:Saumya:LOGGER:=========================');
  //console.log( '| Domain: origin=', origin);
  console.log( '| IP= ', req.ip );
  console.log( '| METHOD= ', req.method);
  console.log( '| Original URL= ', req.originalUrl);

  console.log( '| PARAMS=', req.params);
  console.log( '| BODY=', req.body);
  console.log( '| QUERY= ', req.query);
  
  console.log( '| PATH= ', req.path);
  console.log( '| PROTOCOL= ', req.protocol);
  console.log('=======:Saumya:LOGGER: / ======================');
  next();
}
//app.use(myLogger)

module.exports myLogger;
