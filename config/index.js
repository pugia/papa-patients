var express = require('express')
	,	env = express().get('env') || 'development'
	,	cnf = require('./enviroments/'+env)
	
cnf.db.dburl = cnf.db.dbprotocol+'://'+cnf.db.dbhost+':'+cnf.db.dbport+'/'+cnf.db.dbname;	
	
module.exports = cnf;
