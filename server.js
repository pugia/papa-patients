var express = require('express')
	, bodyParser = require('body-parser')
	,	mongoose = require('mongoose')
	,	auth = require('basic-auth')
	, cnf = require('./config')

	,	users = require('./app/routes/users')

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

mongoose.connect(cnf.db.dburl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB: connection error:'));
db.once('open', function (callback) {
	console.log('DB: open');
});

app.use('/users', users);
app.use('/', express.static(__dirname + '/app/public'));

/*
app.use('/api', function(req, res, next) {
  var credentials = auth(req)
  if (!credentials || credentials.name !== 'volata' || credentials.pass !== 'Svolazzata1') {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="VolataCycles"'
    })
    res.end()
  } else {
		next()
  }
})
app.use('/api', express.static(__dirname + '/docs'));
*/

var server = app.listen(cnf.server.port, function () {
	
  console.log('Example app listening on port '+cnf.server.port);

})
