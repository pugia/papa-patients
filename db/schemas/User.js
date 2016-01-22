var mongoose = require('mongoose')
	,	Schema = mongoose.Schema		

var userSchema = Schema({
			first_name: String,
			last_name: { type: String, index: true },
			phone_1: String,
			phone_2: String,
			created_at:	{ type: Date, default: Date.now, index: true }
		})
	,	User = mongoose.model('User', userSchema)


module.exports = User;