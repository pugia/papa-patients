var dirSchemas = '../../db/schemas/';

var User = require(dirSchemas + 'User')
	,	express = require('express')
	,	router = express.Router()

// get the list
router.get('/', function(req, res) {
	
	var findData = {};
	if (req.query.day != '' && req.query.day != 'null' && req.query.day) { findData['day'] = parseInt(req.query.day); }
	if (req.query.turn != '' && req.query.turn != 'null' && req.query.turn) { findData['turn'] = parseInt(req.query.turn); }
		
	var track = User.find(findData)
		.sort({ 'created_at': 1 })
		.exec(function(error, users) {
			res.send(users);
		})
	
});

router.post('/', function(req, res) {
	
	var user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone_1: req.body.phone_1,
		phone_2: req.body.phone_2,
		day: req.body.day,
		turn: req.body.turn,
	});
	
	user.save(function (err, track) {
	  
	  if (err) {
			res.json({ 
				status: false,
				error: '[User] save: '+err
			});
			return console.error(err);
		}
		
		res.json({ 
			status: true,
			user_id: user._id
		});
	  
	});	
	
});



module.exports = router;
